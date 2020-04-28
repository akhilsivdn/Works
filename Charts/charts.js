

var labels = [];
var datas = [];
var backgroundColors = [];
var chartType = 'bar';
var myChart = null;

function GenerateChart() {
    saveConfig();
    if (labels.length == 0 || datas.length == 0 || backgroundColors.length == 0) {
        alert("Please enter label, data and background for the chart!");
        return;
    }
    if (myChart != null) {
        myChart.destroy();
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: $('.chartLabel').val() || 'Title',
                data: datas,
                backgroundColor: backgroundColors,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: $('.hasZeroStart')[0].checked
                    }
                }]
            }
        }
    });
}

function changeBarType(e) {
    chartType = e.selectedOptions[0].innerText.toLowerCase();
}

function AddData() {
    var parent = document.getElementById('customizations');
    var template = `
        <div class="customize-area d-flex">
            <div class="form-group customize mr-5">
                <input class="form-control label" placeholder="DataSet Label">
            </div>
            <div class="form-group mr-5 customize">
                <input class="form-control data"  placeholder="DataSet Data">
            </div>
            <div class="form-group align-self-center mr-5 customize">
                <input class="d-block" style="height: 35px;
                width: 40px;" type="color">
            </div>
            <div class="form-group align-self-center">
                <button class="btn btn-danger form-control" onclick="deleteRow(this)">Delete</button>
            </div>
        </div>`;
    parent.insertAdjacentHTML('beforeend', template);
}

function deleteRow(e) {
    labels = [];
    datas = [];
    backgroundColors = [];
    e.closest('.customize-area').remove();
}

function saveConfig() {
    labels = [];
    datas = [];
    backgroundColors = [];
    $('.customize-area').each(function (i, obj) {
        if ($(obj).find('input')[0].value.length > 0)
            labels.push($(obj).find('input')[0].value);

        if ($(obj).find('input')[1].value.length > 0)
            datas.push($(obj).find('input')[1].value);

        if ($(obj).find('input')[2].value.length > 0)
            backgroundColors.push($(obj).find('input')[2].value);
    });
}