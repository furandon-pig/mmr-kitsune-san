var vm = new Vue({
  el: '#app',
  data: {
    cvs: null,
    msg: "第五の力だよ！",
    img: null,
    bg: null,
    delete_icon: null,
    text_align: true,
  },
  created: function() {
  },
  mounted: function() {
    this.cvs = new fabric.Canvas('cvs');
    this.cvs.on({
      'object:moving': this.obj_moving,
      'mouse:up': this.obj_mouse_up,
      'selection:created': function(obj) {
        if (1 < obj.selected.length) {
          // 複数のオブジェクト選択が行われたので、
          // 背景画像のZindexを調整する。
          vm.cvs.discardActiveObject();
          vm.cvs.renderAll();
          vm.bg.moveTo(-9999);
        }
      },
    });

    // "id"パラメータが指定されていた場合は、パラメータの
    // 値に応じて読み込む画像を変更する。
    let image_url = 'img.jpg';
    try {
      let params = new URL(window.location.href).searchParams;
      switch (params.get('id')) {
      case '1':
        image_url = 'img.jpg';
        this.text_align = true;
        this.color = 'black';
        break;
      case '2':
        // https://twitter.com/kona_matcha_/status/1394225536210149377
        image_url = 'https://pbs.twimg.com/media/E1lIu_1VEAc6A0E?format=jpg&name=small';
        this.text_align = true;
        this.color = 'black';
        break;
      case '3':
        // https://twitter.com/tomapri/status/1418543297039986691
        image_url = 'img3.png';
        this.text_align = false;
        this.msg = "Tokyo2020 (^_^)/";
        this.color = 'black';
        break;
      case '4':
        // https://twitter.com/GrayMelancholy/status/1570824367445258242
        image_url = 'img4.jpg';
        this.text_align = false;
        this.msg = "";
        this.color = 'black';
        break;
      case '5':
        // https://twitter.com/magaiakashi/status/1665999569648504832
        image_url = 'img5.jpg';
        this.text_align = true;
        this.msg = "";
        this.color = 'black';
        break;
      case '6':
        // https://twitter.com/magaiakashi/status/1665999569648504832
        image_url = 'img6.png';
        this.text_align = true;
        this.msg = "";
        this.color = 'black';
        break;
      case '7':
        // https://x.com/REBHPortal/status/1843215460046872934
        image_url = 'img7.jpg';
        this.text_align = false;
        this.msg = "かゆい　うま";
        this.color = 'white';
        break;
      default:
        image_url = 'img.jpg';
        this.color = 'black';
        break;
      }
    } catch (e) {
      let url = 'img.jpg';
    }

    this.img = document.getElementById('bg');
    this.img.src = image_url;
    this.img.onload = function() {
      let w = vm.img.width;
      let h = vm.img.height;

      vm.cvs.setWidth(w);
      vm.cvs.setHeight(h);

      vm.bg = new fabric.Image(vm.img, {
          left: 0,
          top: 0,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingFlip: true,
          lockScalingX: true,
          lockScalingY: true,
          lockSkewingX: true,
          lockSkewingY: true,
          evented: false,
      });
      vm.bg.setControlVisible('tl', false);
      vm.bg.setControlVisible('tr', false);
      vm.bg.setControlVisible('br', false);
      vm.bg.setControlVisible('bl', false);
      vm.bg.setControlVisible('ml', false);
      vm.bg.setControlVisible('mt', false);
      vm.bg.setControlVisible('mr', false);
      vm.bg.setControlVisible('mb', false);
      vm.bg.setControlVisible('mtr', false);
      vm.cvs.add(vm.bg);

      vm.cvs.discardActiveObject();
      vm.cvs.renderAll();
      vm.bg.moveTo(-9999);
    }

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
    obj_moving: function(obj) {
      if (obj.target) {
        obj.target.set({ opacity: 0.5 });
      }
    },
    obj_mouse_up: function(obj) {
      this.bg.moveTo(-9999);
      if (obj.target) {
        obj.target.set({ opacity: 1.0 });
      } else {
        this.cvs.discardActiveObject();
        this.cvs.renderAll();
        this.bg.moveTo(-9999);
      }
    },
    download: function() {
      let link = document.createElement("a");
      let cvs = document.getElementById('cvs');
      try {
        if (cvs.msToBlob) {
          blob = cvs.msToBlob();
          window.navigator.msSaveBlob(blob, 'image.png');
        } else {
          link.href = cvs.toDataURL("image/png");
          link.download = "image.png";
          link.click();
        }
      } catch(e) {
        console.log(e);
        alert('(T_T) ダウンロード時にエラーが発生しました。');
      }
    },
    add_msg: function() {
      let virtical_msg = this.text_align ? this.msg.split('').join("\n") : this.msg ;
      let new_text = new fabric.Text(
        virtical_msg, {
          left: 100,
          top: 140,
          fontSize: 40,
          fill: this.color,
          borderColor: 'blue',
          cornerStrokeColor: 'blue',
        }
      );
      this.cvs.add(new_text);
    },
  }
})

