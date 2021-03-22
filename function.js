var m = 1 ;
var c = 1;
var k = 10;
var n = 200;
var x1 = new Array(n);
var x2 = new Array(n);
var time = new Array(n);
var dt = 0.05;
for (i = 0; i<n; i++)
{
  x1[i] = 0;
  x2[i] = 0;
  time[i] = i*dt;
}
x1[0] = 1;


function compute()
{
  var i;
  for (i = 0; i<n-1; i++)
  {
    x1[i+1] = x2[i]*dt + x1[i];
    x2[i+1] = x2[i] - (dt/m)*(c*x2[i] + k*x1[i+1]);
  }

  var curve = new Array(n);

  curve = {x : time,
           y : x1,
           type : 'scatter',
           mode : 'lines'};
  console.log(curve.x);
  PLOT = document.getElementById('plot');
	Plotly.newPlot( PLOT, [curve] );
}
