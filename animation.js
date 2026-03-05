const width = 900
const height = 400

const svg = d3.select("#animation")
.append("svg")
.attr("width",width)
.attr("height",height)

const steps = [
{ id:"L1", score:0.31 },
{ id:"L2", score:0.82 },
{ id:"L3", score:0.67 },
{ id:"L4", score:0.79 },
{ id:"L5", score:0.22 }
]

const topK = 2

svg.append("text")
.attr("x",120)
.attr("y",200)
.text("Problem")

const nodes = svg.selectAll("g")
.data(steps)
.enter()
.append("g")
.attr("transform",(d,i)=>`translate(350,${60+i*60})`)

nodes.append("rect")
.attr("width",70)
.attr("height",35)
.attr("fill","white")
.attr("stroke","#aaa")

nodes.append("text")
.attr("x",35)
.attr("y",22)
.attr("text-anchor","middle")
.text(d=>d.id)

nodes.append("text")
.attr("x",85)
.attr("y",22)
.attr("fill","orange")
.text(d=>d.score)

function animate(){

const sorted=[...steps].sort((a,b)=>b.score-a.score)

nodes.data(sorted,d=>d.id)
.transition()
.duration(1500)
.attr("transform",(d,i)=>`translate(350,${60+i*60})`)

nodes.filter(d=>sorted.indexOf(d)>=topK)
.transition()
.duration(1000)
.style("opacity",0.2)

nodes.filter(d=>sorted.indexOf(d)<topK)
.transition()
.duration(1500)
.attr("transform",(d,i)=>`translate(600,${150+i*60})`)

}

setTimeout(animate,2000)