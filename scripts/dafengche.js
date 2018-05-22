/**
 * Created by lenovo on 2016/2/27.
 */
var canvas = document.createElement("canvas");
canvas.id="wheelCanvas";
canvas.width="300";
canvas.height="300";
document.getElementById("canvasBox").appendChild(canvas);
(function () {
    var Pinwheel = function (canvas, options) {
        this.canvas = document.getElementById(canvas);
        this.options = options;
    };
    Pinwheel.prototype = {
        constructor: Pinwheel,
        show: function () {
            var canvas = this.canvas,//ȡ��canvasԪ��
                width = canvas.width,//canvasԪ�صĿ��
                height = canvas.height,//canvasԪ�صĸ߶�
                color = this.options.color,//�糵Ҷ�ӵ���ɫ
                radius = this.options.radius,//�����糵�İ뾶
                wheelRadius = this.options.wheelRadius,//�糵Ҷ�ӵİ뾶
                part = this.options.part,//PI/2�ֳɼ���
                ctx = canvas.getContext("2d"),//��ȡ������
                num = this.options.num,//Ҷ������
                center = {x: width / 2, y: height / 2},//��ͼ���������
                point, //Ҷ��Բ��λ��
                start = 0,//����Ҷ�ӵĿ�ʼ��
                angle = 0,//start = angle
                end = Math.PI,//����Ҷ�ӵĽ�����
                offset = Math.PI * (360 / num) / 180,//��������Ҷ��֮��ĽǶ�
                rotateAngle = offset / part;//ÿ����ת�ĽǶ�
            window.timer2 = setInterval(function () {
                ctx.clearRect(0, 0, width, height);
                for (var i = 0; i < num; i += 1) {
                    ctx.beginPath();//��ʼ����Ҷ��
                    var wheelGradient = ctx.createRadialGradient(center.x, center.y, 100, center.x, center.y, 0);//�������򽥱�
                    wheelGradient.addColorStop(0, color[i]);//��ʼ��ɫ
                    wheelGradient.addColorStop(1, "#000");//������ɫ
                    ctx.fillStyle = wheelGradient;//��佥����ʽ
                    point = {x: center.x + Math.cos(offset * i + angle) * radius, y: center.y + Math.sin(offset * i + angle) * radius};//Ҷ��Բ��λ��
                    var x = start + offset * i;//����Ҷ�ӵĿ�ʼ��
                    var y = end + offset * i;//����Ҷ�ӵĽ�����
                    ctx.arc(point.x, point.y, wheelRadius, x, y, false);//����
                    ctx.fill();//���
                    ctx.closePath();//��������
                }
                ctx.beginPath();
                var dotGradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 40);
                dotGradient.addColorStop(0, "#fff");
                dotGradient.addColorStop(1, "#666");
                ctx.fillStyle = dotGradient;
                ctx.arc(center.x, center.y, 25, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();
                angle += rotateAngle;
                start = angle;
                end = Math.PI + angle;
            }, 20)
        },
        hide: function () {
            clearInterval(window.timer2);
        }
    };

    var options = {
        num: 4,
        color: ["red", "yellow", "blue", "green"],
        radius: 50,
        wheelRadius: 50,
        part: 50
    };

    var a = new Pinwheel("wheelCanvas", options);
    a.show();
}());