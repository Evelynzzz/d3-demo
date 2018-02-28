import React from 'react';   //模块引入
import * as d3 from 'd3';

export default class One extends React.Component {
    componentDidMount(){
        const square = d3.selectAll('rect');
        square.style('fill','blue');
    }
    render() {
        return (
            <div>
                <svg width="300px" height="150px">
                    <rect x="20" y="20" width="20px" height="20" rx="5" ry="5" />
                    <rect x="60" y="20" width="20px" height="20" rx="5" ry="5" />
                    <rect x="100" y="20" width="20px" height="20" rx="5" ry="5"/>
                </svg>
            </div>
        )
    }
}