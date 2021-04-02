//variable declaration
//          inputs
var m = 1 ;
var c = 1;
var k = 1;
var x1 = new Array(n);
var x2 = new Array(n);
var fw = new Array(n);
var ff = 0;
var val= "";

//          constants
var n = 200;
var time = new Array(n);
var dt = 0.05;

//          outputs
var wn;
var wd;
var cc;
var dr;
var tr = new Array(n*10);
var q;
var freqr = new Array(n*10);


function assign()
{
  m = +document.getElementById('mass').value || 1.00;
  k = +document.getElementById('stiff').value || 1.00;
  c = +document.getElementById('damping').value || 1.00;
  var radios = document.getElementsByName('choice');

  for (var i = 0, length = radios.length; i < length; i++)
   {
        if (radios[i].checked) {
           val = radios[i].value;
           break;
         }
    }
  if(val == 'forced')
  {
    ff = +document.getElementById('ff').value || 0.00;
  }
  else if(val == 'free')
  {
    ff = 0;
  }
  else if (val == "" ) {
    alert('Please select choice between forced or free');
  }
  for (i = 0; i<n; i++)
  {
    x1[i] = 0;
    x2[i] = 0;
    time[i] = i*dt;
    fw[i] = 5*Math.sin(ff*i*dt);
  }

  x1[0] = +document.getElementById('x10').value || 0.00;
  x2[0] = +document.getElementById('x20').value || 0.00;
}
function compute()
{
  assign();
  var i;
  for (i = 0; i<n-1; i++)
  {
    x1[i+1] = x2[i]*dt*1.0 + x1[i];
    x2[i+1] = x2[i] + (dt/m)*(fw[i] - c*x2[i] - k*x1[i+1]);
  }
  outputVals();
  plot();
}
function outputVals()
{
  wn = Math.sqrt(k/m);
  document.getElementById('NAF').innerHTML = wn;
  cc = 2*m*wn;
  document.getElementById('CC').innerHTML = cc;
  dr = c/cc;
  document.getElementById('DR').innerHTML = dr;

  wd = wn*Math.sqrt(1-dr*dr);
  document.getElementById('DAF').innerHTML = wd;
  q = 0.5/dr;
  document.getElementById('Q').innerHTML = q;
  var trs = transmissibility(ff/wn);
  document.getElementById('TR').innerHTML = trs;
  for (i = 0; i<n*10; i++)
  {
    freqr[i] = i*dt*10/wn;
    tr[i] = transmissibility(freqr[i]);
  }

}
function transmissibility(frr)
{
  var trs = Math.sqrt((1+Math.pow((2*dr*frr),2))/(Math.pow((1-Math.pow(frr,2)),2)+Math.pow((2*dr*frr),2)));
  return trs;
}

function plot()
{
  var curve = new Array(n);

  curve = {x : time,
           y : x1,
           name: 'Displacement vs Time',
           type : 'scatter',
           mode : 'lines'};

  DVX = document.getElementById('dvx');
  var layout = {
        title: {  text:'Displacement vs Time',  font: {  family: 'Courier New, monospace',size: 24}},
        xaxis: {
          title:{ text: 'Time', font: {family: 'Courier New, monospace', size: 18, color: '#7f7f7f'}}},
        yaxis: {
          title:{ text: 'Displacement',font: {family: 'Courier New, monospace',  size: 18,  color: '#7f7f7f'}}}
        };
	Plotly.newPlot( DVX, [curve], layout );
  if(val == 'forced')
  {
    var trace = {
            x: freqr,
            y: tr,
            type: 'scatter',
            mode : 'lines'};
    var layout = {
          title: {
            text:'Transmissibility vs Frequency Ratio',
            font: {
            family: 'Courier New, monospace',
            size: 24
          }},
          xaxis: {
            type: 'log',
            title:{
            text: 'Frequency Ratio',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'}},
            autorange: true
          },
          yaxis: {
            type: 'log',
            title:{text: 'Transmissibility',font: {  family: 'Courier New, monospace',  size: 18, color: '#7f7f7f'}},
            autorange: true
          }};
          TRFR= document.getElementById('trvsfreqr');
        	Plotly.newPlot( TRFR, [trace], layout);
  }
  else if(val == 'free')
  {
    var layout = {
          title: {
            text:'Transmissibility vs Frequency Ratio',
            font: {
            family: 'Courier New, monospace',
            size: 24
          }},
          xaxis: {
            type: 'log',
            title:{
            text: 'Frequency Ratio',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'}},
            autorange: true
          },
          yaxis: {
            type: 'log',
            title:{text: 'Transmissibility',font: {  family: 'Courier New, monospace',  size: 18, color: '#7f7f7f'}},
            autorange: true
          }};
    TRFR= document.getElementById('trvsfreqr');
    Plotly.newPlot(TRFR,[],layout);
  }
}
