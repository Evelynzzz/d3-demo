import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import * as d3 from 'd3';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

// import './styles/main.less'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }
    componentDidMount() {
        var self = this
        this.svg = d3.select("#container").append("svg")
            .attr("width", this.w)
            .attr("height", this.h)
            .attr("id", 'svg');

        var s = Snap('#svg');
        //定时随机生成点线
        d3.interval(function () {
            //随机生成起始点和终止点坐标
            var from = [Math.floor(Math.random() * self.w), Math.floor(Math.random() * self.h)]
            var to = [Math.floor(Math.random() * self.w), Math.floor(Math.random() * self.h)]

            //生成起始点
            var circleFrom = self.svg.append("circle")
                .attr("r", Math.floor(Math.random() * 15 + 3)) //随机大小
                .attr('cx', from[0])
                .attr('cy', from[1])
                .attr('fill', 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')')   //随机颜色
                .transition()   //逐渐消失
                .duration(1000)
                .style('fill-opacity', 0.1)
                .remove()

            //生成终止点
            var circleTo = self.svg.append("circle")
                .attr("r", Math.floor(Math.random() * 15 + 3))
                .attr('cx', to[0])
                .attr('cy', to[1])
                .attr('fill', 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')')
                .transition()
                .style('fill-opacity', 0.1)
                .duration(1000)
                .remove()

            //生成两点间连线
            //初始时线条的首端和末端都在起始点
            var lineL = s.line(from[0], from[1], from[0], from[1]);
            //设置线条颜色为渐变色
            lineL.attr({
                stroke: "L(" + to[0] + "," + to[1] + "," + from[0] + "," + from[1] + ")#18FFFD-rgba(0,225,132,0.1)",
                'stroke-width': "1px",
                fill:"rgba(0,0,0,0)"
            });
            //设置动画，修改线条末端到终止点
            lineL.animate({ x2: to[0], y2: to[1] }, 500, mina.easeinout, function () {
                //设置动画，修改线条首端到终止点，并且修改线条粗细。结束时线条的首端和末端都在终止点，线条消失。
                lineL.animate({ x1: to[0], y1: to[1], 'stroke-width': '0px' }, 500, mina.easein, function () {
                    lineL.remove();//移除dom节点
                })
            })
        }, Math.floor(Math.random() * 500 + 500))
    }
    render() {
        return (
            <div id="container">
            </div>
        )
    }
}

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path={'/'} component={Main}></Route>
        </Router>
    ),
    document.getElementById('main')
);