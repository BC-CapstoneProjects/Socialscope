import { useEffect } from "react/cjs/react.development"


const PieArc = () => {

    arcRef = useRef(null);

    function arcTween(dOld, dNew, arcGen) {
        const copy = {...dOld};
        return function() {
          const iStart = d3.interpolate(dOld.startAngle, dNew.startAngle);
          const iEnd = d3.interpolate(dOld.endAngle, dNew.endAngle);
          return function(t) {
            copy.startAngle = iStart(t);
            copy.endAngle = iEnd(t);
            return arcGen(copy);
          }
        }
      }

    const arcGen = d3.arc()
      .innerRadius(radius / 2)
      .outerRadius(radius)

    useEffect(() => {
        d3.select(arcRef.elem)
        .transition()
        .duration(2000)
        .attrTween('d', arcTween(prev_pie_data, curr_pie_data, arcGen));
    })

    return (
        <path 
            d={pathD}
            ref={arcRef}
        
        />
    )

}