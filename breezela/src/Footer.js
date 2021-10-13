const Footer = () => {
    return ( 
//footer

<div className="Footer">

<footer class="light padding-20">
  <div class="container">
      <div class="row">
          <div class="col sm-12 md-12 lg-4">
            <div class="container">
              <div>
                <img src="/icons/logo.png" class="height-50" alt="" />
              </div>  
            <div>Lorem ipsum dolor sit amet consectetur  molestias placeat  Assumenda, delectus autem!</div>
            <div class="container flex padding">
              <div class="flex-20">
                  <span class="padding circle light card width-50 height-50 content-middle pointer scale-up"><img src="/icons/facebookColor.png" class="height-30 width-30" alt="" /></span>
              </div>
              <div class="flex-20">
                  <span class="padding circle light card width-50 height-50 content-middle pointer scale-up"><img src="/icons/instagramColor.png" class="height-30 width-30" alt=""/></span>
              </div>
              <div class="flex-20">
                  <span class="padding circle light card width-50 height-50 content-middle pointer scale-up"><img src="/icons/twitterColor.png" class="height-30 width-30" alt=""/></span>
              </div>

          </div>
          </div>  
          </div>
          <div class="hr width-100-p show-medium-down"></div>

          <div class="col sm-6 md-6 lg-2 text-center">
              <div class="text-center text-large">Useful Links</div>
              <a href="" class="block text-black margin-top-10">shipping</a>
              <a href="" class="block text-black margin-top-10">payments</a>
              <a href="" class="block text-black margin-top-10">career</a>
              <a href="" class="block text-black margin-top-10">wholesales</a>
          </div>
          <div class="hr width-100-p show-small"></div>
          <div class="col sm-6 md-6 lg-2 text-center">
              <div class="text-center text-large">More Info</div>
              <a href="" class="block text-black margin-top-10">About Us</a>
              <a href="" class="block text-black margin-top-10">Partners</a>
              <a href="" class="block text-black margin-top-10">online stores</a>
              <a href="" class="block text-black margin-top-10">promotion</a>
          </div>
          <div class="hr width-100-p show-medium-down"></div>
          <div class="col sm-12 md-12 lg-4 padding">
              <div class="text-center text-large">Subscribe To Our News Letter</div>
              <div class="padding text-large">Email:</div>
              <input type="text" class="input borderless no-outline padding white width-100-p" placeholder="Enter your email" /> <br />
              <button class="button padding indigo margin">Subscribe</button>
              <div class="text-small">&copy;2021 copyright law, powered by funcss</div>
          </div>

      </div>
  </div>
</footer>
<div class="fixed bottom-50 right-30 back-to-top pointer padding border circle">
  <span class="material-icons icon size-2">
    expand_less
  </span>
</div>
</div>
     );
}
 
export default Footer;