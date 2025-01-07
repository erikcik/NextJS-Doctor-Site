'use client'

export function GoogleMap() {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe 
          className="gmap_iframe" 
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Doç. Dr. Cuneyt Tamam Ortopedi ve Travmatoloji Kliniği, Hürriyet, 1792. Sk. 3/6, 33120 Yenişehir/Mersin&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </div>
      <style jsx>{`
        .mapouter {
          position: relative;
          text-align: right;
          width: 100%;
          height: 500px;
        }
        .gmap_canvas {
          overflow: hidden;
          background: none!important;
          width: 100%;
          height: 100%;
        }
        .gmap_iframe {
          width: 100%!important;
          height: 100%!important;
        }
      `}</style>
    </div>
  )
}

