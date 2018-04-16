import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import * as d3 from 'd3'
import './styles/main.less'

// import One from "./components/One"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.stopTooltip=true
        this.planets=[
            {
                "name":"ONE",
                "orbitR":150,
                "r":60,
                "speed":10,
                "angleStart":180,
                "imgsrc":"html/img/planet.png"
            },
            {
                "name":"TWO",
                "orbitR":250,
                "r":80,
                "speed":20,
                "angleStart":180,
                "imgsrc":"html/img/planet.png"
            }
        ]
    }

    //初始化
    initElements() {
        var self=this
        //SVG 宽度和高度
        this.x = (window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth) - 50
        this.y = (window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight) - 50
        var t0 = Date.now()

        //创建 SVG
        this.svg = d3.select('#planets').append('svg')
            .attr('width', this.x)
            .attr('height', this.y)
        
        //创建页面中央的星球
        var centerR = 150
        var middleContainer = this.svg.append('g').attr('class','middle-container')
            .attr("transform","translate("+ this.x/2 + "," + this.y/2 + ")")          
        middleContainer.append("svg:image")
            .attr("x", -centerR/2)
            .attr("y", -centerR/2)
            .attr("class","middle-image")
            .attr("xlink:href","html/img/earth.png")
            .attr("width",centerR)
            .attr("height",centerR)      
            .attr("text-anchor","middle") 

        //创建环绕的星球
        var planetsContainer = this.svg.append('g').attr('class','planets-container')
            .attr("transform","translate("+ this.x/2 + "," + this.y/2 + ")")
        var orbits=planetsContainer.append("g").attr("class","orbits")
        var planets=planetsContainer.append("g").attr("class","planets")
        //创建轨道
        orbits.selectAll("g.circle")
        .data(this.planets).enter()
        .each(function (d, i) {
            //创建对应的轨道
            d3.select(this).append("circle")
                .attr("class", "orbit")
                .attr("r", d.orbitR)
                .style("fill","#3E5968")
                .style("fill-opacity","0.2")
                .style("stroke","white")
                .style("stroke-opacity","0.2");
        });
        //创建星球
        planets.selectAll("g.planet")
            .data(this.planets).enter()
            .each(function (d, i) {
                //创建星球
                d3.select(this).append("svg:image")
                    .attr("x", -d.r/2)
                    .attr("y", -d.orbitR-d.r/2)
                    .attr("class","planet")
                    .attr("xlink:href",d.imgsrc)
                    .attr("width",d.r)  
                    .attr("height",d.r)  
                    .attr("text-anchor","middle")
                    .attr("opacity","0.7")
                    .on("mouseover", function() {
                        self.showTooltip(d)
                        self.showOrbit(d, i, 1);
                    })
                    .on("mouseout", function() {            
                        self.showOrbit(d, i, 0.7);
                    })
            });


        //让星球转动
        d3.timer(function () {
            var delta = Date.now() - t0;    //利用时间计算旋转角度
            self.svg.selectAll('.planet')
                .attr('transform', function (d) {
                    d.theta = (d.angleStart + (delta * d.speed )/1000)%360
                    return 'rotate(' + d.theta + ')';
                });
        })
    }

    /**
     * Turn degrees into radians
     * @param {*} angle 
     */
    toRadians (angle) { 
        return angle * (Math.PI / 180)
    }

    //Hightlight the total orbit of the hovered over planet
    showOrbit(d, i, opacity) {
        var planet = i;
        //console.log(d);
        var duration = (opacity == 0) ? 2000 : 100; //If the opacity is zero slowly remove the orbit line
        
        //Highlight the chosen planet
        this.svg.selectAll(".planet")
            .filter(function(d, i) {return i == planet;})
            .transition().duration(duration)
            .style("opacity", opacity);
        
        //Select the orbit with the same index as the planet
        this.svg.selectAll(".orbit")
            .filter(function(d, i) {return i == planet;})
            .transition().duration(duration)
            .style("stroke-opacity", opacity/3)
            .style("fill-opacity", opacity/3);
    }	

    /**
     * Show the tooltip on hover
     * @param {*} d 
     */
    showTooltip(d) {	
        var self=this
        self.stopTooltip= false
        //Set first location of tooltip and change opacity
        var xpos = self.x/2 + d.orbitR*Math.sin(self.toRadians(d.theta));
        var ypos = self.y/2 - d.orbitR*Math.cos(self.toRadians(d.theta))-d.r/2;
        d3.select("#tooltip")
            .style('top',xpos+"px")
            .style('left',ypos+"px")
            .transition().duration(500)
            .style('opacity',1);
            
        //Keep the tooltip moving with the planet, until stopTooltip 
        //returns true (when the user clicks)
        d3.timer(function() { 
            xpos = self.x/2 + d.orbitR*Math.sin(self.toRadians(d.theta));
            ypos = self.y/2 - d.orbitR*Math.cos(self.toRadians(d.theta))-d.r/2;
            
            //Keep changing the location of the tooltip
            d3.select("#tooltip")
                .style('top',ypos+"px")
                .style('left',xpos+"px");
        
            //Breaks from the timer function when stopTooltip is changed to true
            //by another function
            if (self.stopTooltip == true) {
                //Hide tooltip
                d3.select("#tooltip")
                    .style('opacity',0)
                    // .call(self.endall, function() { //Move tooltip out of the way
                    //     d3.select("#tooltip")
                    //         .style('top',0+"px")
                    //         .style('left',0+"px");
                    // });	
                //Remove show how to close
                return self.stopTooltip;
            }
        });
    
        //Change the texts inside the tooltip
        d3.select("#tooltip .tooltip-title").text("I am planet "+d.name);

        //Replace click event
        d3.select("svg")
            .on("click", function(d) {self.stopTooltip = true;});
    }//showTooltip

    //Taken from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
    //Calls a function only after the total transition ends
    // endall(transition, callback) { 
    //     var n = 0; 
    //     transition 
    //         .each(function() { ++n; }) 
    //         .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
    // }

    componentDidMount(){
        this.initElements()
    }

    render() {
        return (
            <div>
                <div id="planets"></div>
                <div id="tooltip">
                    <div id="tooltip-Container">
                        <div className="tooltip-title"></div>
                    </div>
                </div>
            </div>
        )
    }
}  
ReactDOM.render (
    (
        <Router history={hashHistory}>
            <Route path={'/'} component={Main}></Route>
            {/* <Route path={'one'} component={One} />       */}
        </Router>
    ),
    document.getElementById('main')
);