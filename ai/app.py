from flask import Flask, render_template, request
import psycopg2
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from statsmodels.tsa.seasonal import seasonal_decompose

app = Flask(__name__)

engine = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="risuto02",
    host="risuto.cimyjpqudzeb.ap-southeast-1.rds.amazonaws.com",
    port="5432")

cur = engine.cursor()

def plot_graph(x, y, name: str):
    plt.figure(figsize=(12, 4))
    plt.grid(color='#F2F2F2', alpha=1, zorder=0)
    plt.plot(x, y, color='#087E8B', lw=3, zorder=5)
    plt.title(name.capitalize(), fontsize=17)
    plt.xlabel('Time', fontsize=13)
    plt.xticks(fontsize=9)
    plt.ylabel('Watts', fontsize=13)
    plt.yticks(fontsize=9)

    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)    
    plt.close()
    return base64.b64encode(img_buffer.getvalue()).decode()


@app.route('/generateReport', methods=['GET'])
def make_rep():
    email = request.args.get('email')

    cur.execute("SELECT iot_data.timestamp, iot_data.data FROM iot_data, iot_user where iot_user.email = %s", (email, ))
    df = pd.DataFrame(cur.fetchall())
    df.columns = ['time', 'data']

    tdi = pd.DatetimeIndex(df['time'])
    df.set_index(tdi, inplace=True)
    df.drop(columns=['time'], inplace=True)

    result = seasonal_decompose(df, period=12)

    original_img = plot_graph(result.observed.index, result.observed, 'original')
    season_img = plot_graph(result.seasonal.index, result.seasonal, 'seasonal')
    trend_img = plot_graph(result.trend.index, result.trend, 'trend')

    return render_template('report.html', imgs=[original_img, season_img, trend_img])

if __name__ == "__main__":
    app.run()