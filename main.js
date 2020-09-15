$(document).ready(function () {

  $.getJSON("https://api.covid19india.org/data.json", function (data) {
    var states = [];
    var confirmed = [];
    var recovered = [];
    var deaths = [];
    var active=[];

    var total_active;
    var total_confirmed;
    var total_recovered;
    var total_deaths;
    var lastupdate;

    var date = [];
    var totalconfirmed = [];
    var totaldeceased = [];
    var totalrecovered = [];

    total_active = data.statewise[0].active;
    total_confirmed = data.statewise[0].confirmed;
    total_recovered = data.statewise[0].recovered;
    total_deaths = data.statewise[0].deaths;
    lastupdate = data.statewise[0].lastupdatedtime;


    $.each(data.statewise, function (id, obj) {
      states.push(obj.state);
      confirmed.push(obj.confirmed);
      recovered.push(obj.recovered);
      deaths.push(obj.deaths);
      active.push(obj.active);
    });

    $.each(data.cases_time_series, function (id, obj) {
      date.push(obj.date);
      totalconfirmed.push(obj.totalconfirmed);
      totaldeceased.push(obj.totaldeceased);
      totalrecovered.push(obj.totalrecovered);
    });

    states.shift();
    confirmed.shift();
    recovered.shift();
    deaths.shift();

    $("#confirmed").append(total_confirmed);
    $("#active").append(total_active);
    $("#recovered").append(total_recovered);
    $("#deaths").append(total_deaths);
    $("#lastupdate").append(lastupdate);

    console.log("Created by M.S.M.")

    var myChart = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(myChart, {
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            label: "Total Confirmed Cases",
            data: totalconfirmed,
            borderColor: "#ffc107",
            minBarLength: 100,

          },
          {
            label: "Total Recovered Cases",
            data: totalrecovered,
            backgroundColor: "#14e81f",
            minBarLength: 100,
          },
          {
            label: "Total Deceased Cases",
            data: totaldeceased,
            backgroundColor: "#F24338",
            minBarLength: 100,
          },
        ],
      },
      option: {},
    });

    var myChart = document.getElementById("myChart2").getContext("2d");
    var chart = new Chart(myChart, {
      type: "line",
      data: {
        labels: states,
        datasets: [
          {
            label: "Confirmed Cases",
            data: confirmed,
            borderColor: "#ff7f00",
            backgroundColor: "#ffc107", 
            minBarLength: 100,
          },
          {
            label: "Recovered",
            data: recovered,
            borderColor: "#28a745",
            backgroundColor: "#00ff3a", 
            minBarLength: 100,
          },
          {
            label: "Deceased",
            data: deaths,
            borderColor: "#ff0018",
            backgroundColor: "#cd3140", 
            minBarLength: 100,
          },
        ],
      },
      option: {},
    });
    var myChart2 = document.getElementById("myChart3").getContext("2d");
    var mypie = new Chart(myChart2, {
      type: "doughnut",
      data: {
        datasets: [
          {

            data: [total_confirmed, total_active, total_deaths, total_recovered],
            backgroundColor: ["#ffc107", "#007bff", "#dc3545", "#28a745"],
          },
        ],
        labels: [
          'Total Confirmed',
          'Total Active',
          'Total Deaths',
          'Total Recovered',
        ],

      },
      option: {},
    });
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    var tbody = $('.table'),
      props = ["state", "confirmed", "active", "recovered", "deaths"];
    $.each(data.statewise, function (i, objk) {
      var tr = $('<tr>');
      $.each(props, function (i, prop) {
        $('<td>').html(objk[prop]).appendTo(tr);
      });
      tbody.append(tr);
    });
    $('tr:first-child').remove();
  });
});
