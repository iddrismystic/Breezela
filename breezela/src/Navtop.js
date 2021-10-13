const Navtop = () => {
    return ( 
        <div className="row light border-bottom">

        <div class="col sm-12 md-6 lg-8 text-left">
                 <span class="material-icons icon fit text-blue pointer">
                     call
                 </span>
                 <span>
                     +233-5525-009-30
                 </span>

                 <span class="padding"> | </span>

                 <span class="material-icons icon fit text-blue pointer">
                     mail
                 </span>
                 <span>
                     beezela@gmail.com
                 </span>
         </div>
         <div class="col sm-12 md-6 lg-4 text-right">
      <span><i class="fa fa-facebook pointer text-blue padding"></i></span>
      <span> | </span>
      <span><i class="fa fa-instagram pointer text-blue padding"></i></span>
      <span> | </span>
      <span><i class="fa fa-twitter pointer text-blue padding"></i></span>
      <span> | </span>
      <span><i class="fa fa-youtube pointer text-blue padding"></i></span>
     </div>
  
      </div>
     );
}
 
export default Navtop;