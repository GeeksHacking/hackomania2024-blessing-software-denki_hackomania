<script>
  import "../app.css";
  const detectColorScheme = () => {
    var theme="light";    //default

    if(localStorage.getItem("theme") == "dark"){
      var theme = "dark";
    }

    if (theme=="dark") {
      document.documentElement.setAttribute("class", "dark");
    } else {
      document.documentElement.setAttribute("class", "light");
    }
  }
</script>

<slot />