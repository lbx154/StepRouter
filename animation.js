
const methodSvg = d3
  .select("#animation")
  .append("svg")
  // 使用 viewBox + preserveAspectRatio 让整幅图在容器中居中缩放
  .attr("viewBox", "0 0 1000 520")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .style("width", "100%")
  .style("height", "100%")

// Data
const methodSteps = [
  { id: "L1", score: 0.31 },
  { id: "L2", score: 0.82 },
  { id: "L3", score: 0.67 },
  { id: "L4", score: 0.79 },
  { id: "L5", score: 0.22 },
]

const methodTopK = 2

// Problem
methodSvg
  .append("rect")
  .attr("class", "box")
  .attr("x", 40)
  .attr("y", 220)
  .attr("width", 150)
  .attr("height", 60)

methodSvg
  .append("text")
  .attr("x", 115)
  .attr("y", 255)
  .attr("text-anchor", "middle")
  .text("Problem")

// Sketch
const sketch = methodSvg.append("g").style("opacity", 0)

sketch
  .append("rect")
  .attr("class", "box")
  .attr("x", 230)
  .attr("y", 220)
  .attr("width", 150)
  .attr("height", 60)

sketch
  .append("text")
  .attr("x", 305)
  .attr("y", 255)
  .attr("text-anchor", "middle")
  .text("Sketch")

// Steps
const stepGroup = methodSvg.append("g").style("opacity", 0)

const methodNodes = stepGroup
  .selectAll("g")
  .data(methodSteps)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", (d, i) => `translate(450,${80 + i * 70})`)

methodNodes
  .append("rect")
  .attr("class", "step")
  .attr("width", 80)
  .attr("height", 40)

methodNodes
  .append("text")
  .attr("x", 40)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .text((d) => d.id)

methodNodes
  .append("text")
  .attr("class", "score")
  .attr("x", 95)
  .attr("y", 25)
  .text((d) => d.score)

// Router
const router = methodSvg.append("g").style("opacity", 0)

router
  .append("rect")
  .attr("class", "box")
  .attr("x", 700)
  .attr("y", 220)
  .attr("width", 120)
  .attr("height", 60)

router
  .append("text")
  .attr("x", 760)
  .attr("y", 255)
  .attr("text-anchor", "middle")
  .text("StepRouter")

// Solver
const solver = methodSvg.append("g").style("opacity", 0)

solver
  .append("rect")
  .attr("class", "box")
  .attr("x", 870)
  .attr("y", 220)
  .attr("width", 120)
  .attr("height", 60)

solver
  .append("text")
  .attr("x", 930)
  .attr("y", 255)
  .attr("text-anchor", "middle")
  .text("Solver")

const answer = methodSvg
  .append("text")
  .attr("x", 930)
  .attr("y", 340)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("fill", "#10b981")
  .style("opacity", 0)
  .text("Answer = 49")

// ---- Timeline helpers ----

function methodSortSteps() {
  const sorted = [...methodSteps].sort((a, b) => b.score - a.score)

  methodNodes
    .data(sorted, (d) => d.id)
    .transition()
    .duration(1200)
    .attr("transform", (d, i) => `translate(450,${80 + i * 70})`)
}

function methodPruneSteps() {
  const sorted = [...methodSteps].sort((a, b) => b.score - a.score)

  methodNodes
    .filter((d) => sorted.indexOf(d) >= methodTopK)
    .transition()
    .duration(800)
    .style("opacity", 0.15)

  methodNodes
    .filter((d) => sorted.indexOf(d) < methodTopK)
    .select("rect")
    .classed("selected", true)
}

function methodRouteSteps() {
  const sorted = [...methodSteps].sort((a, b) => b.score - a.score)

  methodNodes
    .filter((d) => sorted.indexOf(d) < methodTopK)
    .transition()
    .duration(1200)
    .attr("transform", (d, i) => `translate(720,${200 + i * 60})`)
}

function methodSolve() {
  solver.transition().duration(600).style("opacity", 1)

  answer
    .transition()
    .delay(800)
    .duration(600)
    .style("opacity", 1)
}

// Animation sequence (looped)

function startAnimation() {
  // reset state
  sketch.interrupt().style("opacity", 0)
  stepGroup.interrupt().style("opacity", 0)
  router.interrupt().style("opacity", 0)
  solver.interrupt().style("opacity", 0)
  answer.interrupt().style("opacity", 0)

  methodNodes
    .interrupt()
    .data(methodSteps, (d) => d.id)
    .style("opacity", 1)
    .attr("transform", (d, i) => `translate(450,${80 + i * 70})`)

  methodNodes.select("rect").classed("selected", false)

  // run timeline
  sketch
    .transition()
    .delay(1000)
    .duration(800)
    .style("opacity", 1)

  stepGroup
    .transition()
    .delay(2000)
    .duration(800)
    .style("opacity", 1)

  setTimeout(methodSortSteps, 3500)
  setTimeout(methodPruneSteps, 5200)

  router
    .transition()
    .delay(5200)
    .duration(600)
    .style("opacity", 1)

  setTimeout(methodRouteSteps, 6500)
  setTimeout(methodSolve, 8500)
}

// 首次播放
startAnimation()

// 每 10 秒循环一次（略大于整段动画总时长）
setInterval(startAnimation, 10000)