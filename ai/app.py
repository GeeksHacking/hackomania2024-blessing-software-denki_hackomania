from flask import Flask, send_file
import psycopg2
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from PDF import PDF

engine = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="risuto02",
    host="risuto.cimyjpqudzeb.ap-southeast-1.rds.amazonaws.com",
    port="5432")

cur = engine.cursor()

cur.execute("SELECT * FROM test_data")

def plot(x, y, name: str):
    plt.figure(figsize=(12, 4))
    plt.grid(color='#F2F2F2', alpha=1, zorder=0)
    plt.plot(x, y, color='#087E8B', lw=3, zorder=5)
    plt.title(name.capitalize(), fontsize=17)
    plt.xlabel('Time', fontsize=13)
    plt.xticks(fontsize=9)
    plt.ylabel('Watts', fontsize=13)
    plt.yticks(fontsize=9)
    plt.savefig(f'temp/{name}.png', dpi=300, bbox_inches='tight', pad_inches=0)
    plt.close()

app = Flask(__name__)

@app.route('/generateReport/<id>', methods=['POST'])
def make_report(id):
    # cur.execute("SELECT * FROM test_data, user where user.id = %s", (id,))
    cur.execute("SELECT * FROM test_data")
    records = cur.fetchall()

    df = pd.DataFrame([(dt, data) for _, data, dt in records])
    df.columns = ['time', 'data']

    tdi = pd.DatetimeIndex(df['time'])
    df.set_index(tdi, inplace=True)
    df.drop(columns=['time'], inplace=True)

    result = seasonal_decompose(df, period=12)

    plot(result.observed.index, result.observed, 'original')
    plot(result.seasonal.index, result.seasonal, 'seasonal')
    plot(result.trend.index, result.trend, 'trend')

    pdf_maker = PDF()
    pdf_maker.print_page(['temp/original.png', 'temp/seasonal.png', 'temp/trend.png'])

    pdf_maker.output('temp/report.pdf', 'F')
    return send_file('temp/report.pdf', as_attachment=True, download_name='report.pdf')

if __name__ == "__main__":
    app.run()