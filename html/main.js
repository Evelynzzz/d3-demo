import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import * as d3 from 'd3'
import './styles/main.less'

// import One from "./components/One"

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    //初始化
    initElements() {
        //SVG 宽度和高度
        this.x = (window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth) - 50
        this.y = (window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight) - 50
        
        //创建 SVG
        this.svg = d3.select('#planets').append('svg')
            .attr('width', this.x)
            .attr('height', this.y)
        
        //创建页面中央的容器
        var imgWidth = 200
        var middleContainer = this.svg.append('g').attr('class','middle-container')
            .attr("transform","translate("+ this.x/2 + "," + this.y/2 + ")")          
        var middleImage = middleContainer.append("svg:image")
            .attr("x", -imgWidth/2)
            .attr("y", -imgWidth/2)
            .attr("class","middle-image")
            .attr("xlink:href","html/img/earth.png")
            .attr("width",imgWidth)
            .attr("height",imgWidth)      
            .attr("text-anchor","middle") 

        //创建轨道
        var orbitcx = this.x/2
        var orbitcy = this.y/2
        var orbitrx = 150
        var orbitry = 150
        var orbitContainer = this.svg.append('g').attr('class','orbit-container')
        var orbit = orbitContainer.append('ellipse')
            .attr("class","orbit")
            .attr("cx", orbitcx)
            .attr("cy", orbitcy)
            .attr("rx", orbitrx)
            .attr("ry", orbitry)
            .style("fill","#3E5968")
            .style("fill-opacity","0.2")
            .style("stroke","white")
            .style("stroke-opacity","0.2")

        //创建环绕的图像
        var planetWidth = 60
        var radius = 150
        var planetContainer = this.svg.append('g').attr('class','planet-container')
            .attr("transform","translate("+ this.x/2 + "," + this.y/2 + ")")
        var planet = planetContainer.append("svg:image")
            .attr("x", -planetWidth/2)
            .attr("y", radius-planetWidth/2)
            .attr("class","planet")
            .attr("xlink:href","html/img/planet.png")
            .attr("width",planetWidth)  
            .attr("text-anchor","middle") 
            
    }

    componentDidMount(){
        this.initElements()
    }

    render() {
        return (
            <div>
                <div id="planets"></div>
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