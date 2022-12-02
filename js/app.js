async function getdata() {
    var inputVal = document.getElementById("searchTxt").value;
    var inputDate = document.getElementById("dateTxt").value;
    

    const res = await fetch(
        "https://weatherapi-com.p.rapidapi.com/history.json?q="+inputVal+"&dt="+inputDate , {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "7c244159ebmsh46a1973dfd73bb4p1c3f8bjsn6da10c4079ce",
		          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
            },
        }
    );