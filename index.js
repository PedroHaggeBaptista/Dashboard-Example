var data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [{
        label: "Questões Mensais",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        borderColor: "#ffa500",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [17000, 33000, 24000, 23000, 8000, 19000, 200, 34000, 26000, 27000, 28000, 29000]
    }],
};

var dataGPT = {
    labels: [new Date().getDate() - 2, new Date().getDate() - 1, new Date().getDate()],
    datasets: [{
        label: "r",
        borderColor: "#d80002",
        data: [153.4, 123.2, 132.8]
    }],
};

var chartChat = {
    labels: [new Date().getDate() - 2, new Date().getDate() - 1, new Date().getDate()],
    datasets: [{
        label: "r",
        borderColor: "#FFF",
        data: [0, 0, 542]
    }],
}

var alertChart = {
    labels: [new Date().getDate() - 2, new Date().getDate() - 1, new Date().getDate()],
    datasets: [{
        label: "r",
        borderColor: "#FFF",
        data: [12, 15, 10]
    }],
}

var errChatChart = {
    labels: [new Date().getDate() - 2, new Date().getDate() - 1, new Date().getDate()],
    datasets: [{
        label: "r", //Remover a legenda
        borderColor: "#FFF",
        data: [5, 7, 3]
    }],
}

function loadPage() {
    createElement()
    createElement1()
    createElement2()
    createElement3()
    createElement4()
}

window.onload = async function() {
    await fetchInfos()

    loadPage()
}

function substituirPorZero(array, indice) {
    if (indice >= 0 && indice < array.length) {
        for (let i = indice + 1; i < array.length; i++) {
        array[i] = 0;
        }
    } else {
        console.error("Índice fora dos limites do array.");
    }
}

async function fetchInfos() {
    const response = await fetch('http://localhost:3001/v1/chat/getAllMessages')

    const dataJson = await response.json()

    const date = new Date()

    data.datasets[0].data[date.getMonth()] = dataJson.messages

    chartChat.datasets[0].data[chartChat.datasets[0].data.length - 1] = dataJson.chats

    document.getElementById("qntChats").innerText = String(dataJson.chats)

    substituirPorZero(data.datasets[0].data, date.getMonth())

    return dataJson
}

function createElement() {
    var ctx = document.getElementById("myChart").getContext("2d");

    var myNewChart = new Chart(ctx , {
        type: "line",
        data: data,
        options: {
            elements: {
                line: {
                    tension: 0.4, // Ajuste este valor para controlar a curvatura das linhas
                }
            }
        }
    });
}

function createElement1() {
    var ctx = document.getElementById("chartGPT").getContext("2d");

    var myNewChart = new Chart(ctx , {
        type: "line",
        data: dataGPT,
        options: {
            elements: {
                line: {
                    tension: 0.4, // Ajuste este valor para controlar a curvatura das linhas
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    });
}

function createElement2() {
    var ctx = document.getElementById("chartChat").getContext("2d");

    var myNewChart = new Chart(ctx , {
        type: "line",
        data: chartChat,
        options: {
            elements: {
                line: {
                    tension: 0.4, // Ajuste este valor para controlar a curvatura das linhas
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        },   
    });
}

function createElement3() {
    var ctx = document.getElementById("alertChart").getContext("2d");

    var myNewChart = new Chart(ctx , {
        type: "line",
        data: alertChart,
        options: {
            elements: {
                line: {
                    tension: 0.4, // Ajuste este valor para controlar a curvatura das linhas
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    });
}

function createElement4() {
    var ctx = document.getElementById("errChatChart").getContext("2d");

    var myNewChart = new Chart(ctx , {
        type: "line",
        data: errChatChart,
        options: {
            elements: {
                line: {
                    tension: 0.4, // Ajuste este valor para controlar a curvatura das linhas
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    });
}


setInterval(async () => {
    window.location.reload()
}, 1800000);

console.log("Hello World from index.js")