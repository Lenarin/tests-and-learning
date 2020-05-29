
window.onload = function() {
  
    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");

    var params = new function() {
        this.smoothingTimeConstant = 0.01;
        this.minDecibels = -50;
        this.maxDecibels = -20;
        this.fftSize = 2048;
        this.decSize = function() {
            if (this.fftSize > 16) {
                this.fftSize /= 2;
            }
        }
        this.incSize = function() {
            if (this.fftSize < 16384) {
                this.fftSize *= 2;
            }
        };
        this.leftBorder = 0.0;
        this.rightBorder = 1.0;
    }

    var gui = new dat.GUI();

    var f1 = gui.addFolder('FFT');

    f1.add(params, 'smoothingTimeConstant', 0, 1);
    f1.add(params, 'minDecibels', -100, 0);
    f1.add(params, 'maxDecibels', -100, 0);
    f1.add(params, 'fftSize').listen();
    f1.add(params, 'decSize');
    f1.add(params, 'incSize');
    f1.open();

    var f2 = gui.addFolder('Misc');

    f2.add(params, 'leftBorder', 0, 1);
    f2.add(params, 'rightBorder', 0, 1);
    f2.add(audio, 'loop');
    f2.add(audio, 'volume', 0, 1).listen();
    f2.add(audio, 'play');
    f2.add(audio, 'pause');


    file.onchange = function() {
      var files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      var canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = params.fftSize;
  
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
  
      var dataArray = new Uint8Array(bufferLength);
  
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;

      var MIDDLE = canvas.height / 2;
      var MAX = 255;
  
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight, h;
      var x = 0;
  
      function renderFrame() {
        requestAnimationFrame(renderFrame);

        analyser.smoothingTimeConstant = params.smoothingTimeConstant;
        analyser.minDecibels = params.minDecibels;
        analyser.maxDecibels = params.maxDecibels;

        analyser.fftSize = params.fftSize;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        barWidth = (WIDTH /  (params.rightBorder * bufferLength)) * 2.5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
  
        ctx.fillStyle = "#000";
        
        ctx.beginPath();
        ctx.moveTo(x, MIDDLE);
        
        for (var i = params.leftBorder * bufferLength; i < params.rightBorder * bufferLength; i++) {
            h = dataArray[i];

            if (i % 2 == 0)
                barHeight = HEIGHT - h - MIDDLE
            else
                barHeight = HEIGHT + h - MIDDLE;

            ctx.lineTo(x + barWidth, barHeight);
            
            var r = barHeight + (25 * (i/bufferLength));
            var g = 250 * (i/bufferLength);
            var b = 50;

            x += barWidth + 1;                                                    
        }

        ctx.stroke();
      }
  
      audio.play();
      renderFrame();
    };
  };

