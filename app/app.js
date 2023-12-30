const Chart = window.Chart;
const ctx = document.getElementById('canvas');

fetch('C:\Users\RAHUL RAY\Desktop\expenses-chart-component-main\app\data.json')
  .then(response => response.json())
  .then(data => {
    createBarChart(data);
  })
  .catch(error => console.error('Error fetching data:', error));

function createBarChart(data) {

  const days = data.map(entry => entry.day);
  const amounts = data.map(entry => entry.amount);

  // Sum up the amounts
  const totalAmount = amounts.reduce((acc, value) => acc + value, 0);
  document.getElementById('total').textContent = '$'+`${totalAmount.toFixed(2)}`;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: null, 
        data: amounts,
        backgroundColor: 'hsl(10, 79%, 65%)',
        borderColor: 'hsl(10, 79%, 65%)',
        borderWidth: 1,
        borderSkipped:false,
        borderRadius: 5,
        hoverBackgroundColor:'hsl(186, 34%, 60%)',
        hoverBorderColor: 'hsl(186, 34%, 60%)'
      }]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder:false
          }
        },
        y: {
          display:false,
          grid: {
            display: false 
          }
        }
      },
      plugins: {
        legend: {
          display: false 
        },
        tooltip: {
            mode: 'x', 
            intersect: false,
            callbacks: {
                label: (context) => {
                  return context.parsed.y;
                }
            }
        }
      }
    }
  });
}
