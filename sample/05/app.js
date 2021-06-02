var vm = new Vue({
  el: '#app',
  data: {
    cvs: null,
    bg: null,
    delete_icon: null,
  },
  mounted: function() {
    this.cvs = new fabric.Canvas('cvs');

    this.delete_icon = document.createElement('img');
    this.delete_icon.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.delete_object,
      render: this.render_icon(this.delete_icon),
      cornerSize: 24
    });
  },
  methods: {
    render_icon: function(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size/2, -size/2, size, size);
        ctx.restore();
      }
    },
    delete_object: function(event_data, transform) {
      let target = transform.target;
      let canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    },
    circle: function() {

      this.cvs.add(new fabric.Circle({
        radius: 20,
        fill: 'green',
        left: 100,
        top: 100,
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

