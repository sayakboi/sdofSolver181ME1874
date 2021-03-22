//variable declaration
//          inputs
var m = 1 ;
var c = 1;
var k = 1;
var x1 = new Array(n);
var x2 = new Array(n);

//          constants
var n = 200;
var time = new Array(n);
var dt = 0.05;

//          outputs
var wn;
var wd;
var fn;
var fd;
var t;
var q;
for (i = 0; i<n; i++)
{
  x1[i] = 0;
  x2[i] = 0;
  time[i] = i*dt;
}

function assign()
{
  m = +document.getElementById('mass').value;
  k = +document.getElementById('stiff').value;
  c = +document.getElementById('damping').value;
  x1[0] = +document.getElementById('x10').value;
  x2[0] = +document.getElementById('x20').value;
}
function compute()
{
  assign();
  var i;
  for (i = 0; i<n-1; i++)
  {
    x1[i+1] = x2[i]*dt*1.0 + x1[i];
    console.log(x1[i]);
    x2[i+1] = x2[i] - (dt/m)*(c*x2[i] + k*x1[i+1]);
  }
  outputVals();
  plot();
}
function outputVals()
{
  wn = Math.sqrt(k/m);
  document.getElementById('NAF').innerHTML = wn;
}
function plot()
{
  var curve = new Array(n);

  curve = {x : time,
           y : x1,
           type : 'scatter',
           mode : 'lines'};
  PLOT = document.getElementById('plot');
	Plotly.newPlot( PLOT, [curve], {annotatiosn:align="center"} );
}
