const colors = [ '#FF0000',
'#FF4500',
'#FFA500',
'#FFFF00',
'#ADFF2F',
'#7FFF00',
'#7CFC00',
'#32CD32',
'#228B22',
'#008000']
const clockSymbols = [
"🕑","🕝", "🕗","🕑","🕝", "🕗","🕑","🕝", "🕗","🕑","🕝", "🕗"
]
export function TimeComponent({ value }) {
  
    return (
      <div style={{width:"100%", textAlign:"center"}}>
        <p className="text-lg mb-2">{clockSymbols[value]} {value}</p>
      <div style={{border:"2px solid " + colors[value], width: (value-1) * 10 + "%", transition:"width .8s"}}></div>
      </div>
    );
}