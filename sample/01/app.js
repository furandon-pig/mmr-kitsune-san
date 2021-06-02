var vm = new Vue({
  el: '#app',
  data: {
    cvs: null,
    bg: null,
  },
  mounted: function() {
    this.cvs = new fabric.Canvas('cvs');
  },
  methods: {
    circle: function() {
      this.cvs.add(new fabric.Circle({
        radius: 20,
        fill: 'green',
        left: 100,
        top: 100
      }));
    },
    ellipse: function() {
      this.cvs.add(new fabric.Circle({
        radius: 20,
        ry: 40,
        fill: 'blue',
        left: 100,
        top: 100,
      }));
    },
    line: function() {
      this.cvs.add(new fabric.Line(
        [50, 100, 200, 200], {
          left: 170,
          top: 150,
          stroke: 'red'
        }));
    },
    polygon: function() {
      this.cvs.add(new fabric.Polygon(
        [
          { x: 67, y: 42 },
          { x: 32, y: 45 },
          { x: 65, y: 12 },
          { x: 34, y: 98 },
        ], {
          left: 170,
          top: 150,
          fill: 'purple'
        }));
    },
    polyline: function() {
      this.cvs.add(new fabric.Polyline(
        [
          { x: 67, y: 42 },
          { x: 32, y: 45 },
          { x: 65, y: 12 },
          { x: 34, y: 98 },
          { x: 67, y: 42 },
        ], {
          left: 170,
          top: 150,
          fill: 'white',
          stroke: 'green'
        }));
    },
    rect: function() {
      this.cvs.add(new fabric.Rect({
        angle: 15,
        width: 100,
        height: 100,
        fill: 'yellow',
        strokeWidth: 2,
        stroke: 'red',
        left: 100,
        top: 100,
      }));
    },
    triangle: function() {
      this.cvs.add(new fabric.Triangle({
        width: 100,
        height: 100,
        fill: 'blue',
        left: 100,
        top: 100
      }));
    },
    text: function() {
      this.cvs.add(new fabric.Text(
        'Hello,World.', {
          fill: 'black',
          left: 100,
          top: 100
        }
      ));
    },
    image: function() {
      let img = document.getElementById('bg');
      img.src = "https://upload.wikimedia.org/wikipedia/commons/9/92/Nyctereutes_procyonoides_16072008.jpg";
      img.onload = function() {
        let img2 = document.getElementById('bg');
        vm.cvs.add(new fabric.Image(
          img2, {
            left: 100,
            top: 100,
            scale: 0.5
          }
        ));
      }
    }
  }
})

