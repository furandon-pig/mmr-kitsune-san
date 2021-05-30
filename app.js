var vm = new Vue({
  el: '#app',
  data: {
    cvs: null,
    msg: "第五の力だよ！",
    objs: [],
    img: null,
    bg: null,
  },
  created: function() {
  },
  mounted: function() {
    this.cvs = new fabric.Canvas('cvs');
    this.cvs.on({
      'object:moving': this.obj_moving,
      'mouse:up': this.obj_mouse_up,
      'mouse:dblclick': this.obj_mouse_dblclick,
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
        break;
      default:
        image_url = 'img.jpg';
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
  },
  methods: {
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
    obj_mouse_dblclick: function(obj) {
      if (obj.target) {
        obj.target.set({ opacity: 0.75 });
        for (var i in this.objs) {
          let msg = this.objs[i].text.split("\n").join('');
          if (window.confirm(`テキスト「${msg}」を削除しますか？`)) {
            if (this.objs[i].opacity === 0.75) {
              this.cvs.remove(this.objs[i]);
              this.objs.splice(i, 1);
              return;
            }
          } else {
            return;
          }
        }
        obj.target.set({ opacity: 1.0 });
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
      let virtical_msg = this.msg.split('').join("\n");
      let new_text = new fabric.Text(
        virtical_msg, {
          left: 100,
          top: 140,
          fontSize: 40,
          fill: 'black',
          borderColor: 'blue',
          cornerStrokeColor: 'blue',
        }
      );
      this.objs.push(new_text);
      this.cvs.add(new_text);
    },
  }
})

