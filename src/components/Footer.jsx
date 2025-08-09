import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200  items-center p-4 fixed bottom-0">
  <aside className="grid-flow-col items-center">
    
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a  href="#">
        <img src="https://cdn.mos.cms.futurecdn.net/z3bn6deaxmrjmQHNEkpcZE.jpg" className="h-10 w-10 rounded-full object-cover"/>
    
    </a>
    <a href="#">

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7U0MJAUaubQTRXSG7Q7m1WZ_FQPTKKQCHDA&s" className="h-10 w-10 rounded-full object-cover"/>
    
    </a>
  
   <a href="#">

        <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToaHgq8rpVREG29anMgLXMu_ueYjDZ4fQZIA&s" className="h-10 w-10 rounded-full object-cover"/>
    
    </a>
  </nav>
</footer>
    </div>
  )
}

export default Footer


