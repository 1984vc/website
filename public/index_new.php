<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-178383975-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-178383975-1');
  </script>
  <meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="title" content="1984 Ventures">
  <meta name="description" content="Seed Stage Venture Capital"> 
  
	<link rel="stylesheet" type="text/css" href="font/1709-PNZNKV.css">
	<link rel="stylesheet" type="text/css" href="style.css">
	<title>1984 Ventures</title>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script> 
		var winW = $(window).width();

		$(document).ready(function() {
			/* EXTRA WIDE CENTERING */
			if(winW > 1360){
				$("#philosophy").css("left", (winW/2) - 240 + "px");
				$("#portfolio").css("left", (winW/2) - 420 + "px");
				$("#newsletter").css("left", (winW/2) - 600 + "px");
				$("#archive").css("left", (winW/2) - 640 + "px");
			} else {
				$("#philosophy").css("left", "");
				$("#portfolio").css("left", "");
				$("#newsletter").css("left", "");
				$("#archive").css("left", "");
			}
			/* ARCHIVE TOGGLE */
			$(".newsletter-top-right").click(function() {
				$("#newsletter").hide();
				$("#archive").show();
			});
			$(".archive-top-right").click(function() {
				$("#newsletter").show();
				$("#archive").hide();
		  });
		});
		$(window).resize(function() {
			var winW 	= $(window).width();
			/* EXTRA WIDE CENTERING */
			if(winW > 1360){
     		            $("#philosophy").css("left", (winW/2) - 240 + "px");
				$("#portfolio").css("left", (winW/2) - 420 + "px");
				$("#newsletter").css("left", (winW/2) - 600 + "px");
				$("#archive").css("left", (winW/2) - 640 + "px");
			} else {
				$("#philosophy").css("left", "");
				$("#portfolio").css("left", "");
				$("#newsletter").css("left", "");
				$("#archive").css("left", "");
			}
			/* ARCHIVE TOGGLE */
			if(winW > 1200){
				$("#newsletter").show();
				$("#archive").show();
			}
		});
	</script>
</head>
<body class="AtlasTypewriter-Light-Web">
  <div id="wrapper">
    <div id="logo"></div>	
    <div id="philosophy">
      <div class="philosophy_container container">
	<div class="header AtlasTypewriter-Regular-Web">PHILOSOPHY</div>
			<div class="title white">
			  No buzzwords. No hype. We invest in founders using software to solve real &#x1f30e; problems.
			</div>
			<div id="pillarContainer">
			  <div class="pillars">
					<p>How we invest</p>
					<ol>
					  <li>We only invest in seed &#127793;. It’s what we know and love and where we provide the most value </li>
					  <li>We are drawn to founders with grit, industry insights and a strong engineering culture &#128105;&#8205;&#128187;</li>
					  <li>We invest via SAFE or equity, and can lead or participate.</li>
          </ol>
        </div>
			  <div class="pillars MID">
			    <p>How we operate</p>
          <ol>
            <li>We don't take board seats.  We prefer to be in your speed dial and get the late-night call &#129305;</li>
            <li>We help with recruiting, &#128176; raising, and founder therapy &#128553;</li>	    
            <li>We will work with you to ensure you're set up for an outstanding Series A &#127942;</li>
          </ol>
			  </div>
			</div>
			<div id="teamContainer">
			  <div id="teamInvest">
			    <div class="header AtlasTypewriter-Regular-Web"  id="investHeader">INVESTMENT TEAM</div>
			    <!---------------------------->
			    <!------ RAMY RAMY RAMY ------>
			    <!---------------------------->
			    <div class="SVGcontainer"><div id="ramySVG"></div></div>
			    <div class="nameJob">
			      <p>Ramy Adeeb</p>
						<p class="job">General Partner</p>
					</div>
					<div class="bio">
						An entrepreneur and investor, Ramy is founder and CEO of Snip.it (Acquired by Yahoo, where he served as a product executive) and one of the earliest engineers at Tellme Networks (Acquired by Microsoft). Ramy started his investing career at Khosla Venture where he worked with investors Vinod Khosla and Pierre Lamond on many investments including Groupme (acquired by Skype), Square (NASDAQ:SQ), and Storify (acquired by LiveFyre). He holds a BA and MS in Computer Science from Harvard and an MBA from Stanford.
					</div>
					<!--------------------------->
					<!---- AARON AARON AARON ---->
					<!--------------------------->
					<div class="SVGcontainer"><div id="aaronSVG"></div></div>
					<div class="nameJob">
						<p>Aaron Michel</p>
						<p class="job">Partner</p>
					</div>
					<div class="bio">
						Named to venture capital’s 40 Under 40 by VC Journal in 2020, Aaron is the co-founder of PathSource, an edtech startup that rose to be the top career app in the App Store until its acquisition in 2017. Aaron also created the online game Fantasy Politics for the 2012 election. Inducted into the annual Innovation Rockstar list by the Boston Business Journal, Aaron has written for Entrepreneur Magazine, Fast Company and a range of business outlets. He holds an MBA from Harvard Business School and an MPA from Harvard Kennedy School of Government.
					</div>
					<!---------------------------->
					<!--- FARZAD FARZAD FARZAD --->
					<!---------------------------->
					<div class="SVGcontainer"><div id="farzadSVG"></div></div>
					<div class="nameJob">
						<p>Farzad Soleimani</p>
						<p class="job">Healthcare Partner</p>
					</div>
					<div class="bio">
						A VC by day and an ER physician by night, Farzad has over 15 years of experience at the intersection of healthcare and entrepreneurship. He is the founder of eTherapi, a pioneering telemedicine company, and the founding co-director of the Texas Medical Center Biodesign Innovation Program. Farzad started his investing career at Mohr Davidow Ventures, completed his residency training at Baylor and earned his MBA, MD, MS, and BS from Stanford University. He is on faculty at Baylor Medical School, Rice Business School, and Rice Bioengineering Department.
					</div>

					<!---------------------------->
					<!--- Samit                 -->
					<!---------------------------->
					<div class="SVGcontainer"><div id="samitSVG"></div></div>
					<div class="nameJob">
						<p>Samit Kalra</p>
						<p class="job">Principal</p>
					</div>
					<div class="bio">
Growing up in Sydney, Samit cut his teeth in startups and investment banking, before moving to San Francisco in 2017 to pursue a career in technology. Since then, he has spent time in operating roles at AngelList and as a seed investor at Bain Capital Ventures. While at Bain, Samit ran the firm's early-stage fund program which generated 15 seed investments, including Compound Finance ($3B market cap). He holds a double degree in Business and Law (First Class Honors) from the University of Sydney.
					</div>

				</div>
				<div id="teamPartners">
					<div class="header AtlasTypewriter-Regular-Web" id="advisorsHeader">SENIOR ADVISORS</div>
					<div class="nameJob">
						<p>Andy Rachleff</p>
						<p class="job">Founder of Benchmark Capital</p>
					</div>
					<div class="nameJob">
						<p>Michael Smith</p>
						<p class="job">Dean of the Faculty of Arts and Sciences at Harvard University</p>
					</div>
					<div class="nameJob">
						<p>Jim Messina</p>
						<p class="job">Chief of staff for operations under President Obama</p>
					</div>
					<div class="nameJob">
						<p>Mohammed Mansour</p>
						<p class="job">Chairman of Mansour Group, a global conglomerate and GM's largest distributor globally</p>
					</div>
          
					<div class="header AtlasTypewriter-Regular-Web" id="partnersHeader">TECHNOLOGY PARTNERS</div>
					<div class="nameJob">
					  <p>Kyle Oppenheim</p>
					  <p class="job">VP of Engineering at Groupon, director of eng at Facebook</p>
					</div>
					<div class="nameJob">
					  <p>Mark Percival</p>
					  <p class="job">First mobile engineer at Twitter, Co-founder and CTO at Snipit, Architect at Yahoo</p>
					</div>
					<div class="nameJob">
					  <p>Karim Wahba</p>
					  <p class="job">Data Science manager at Stitch Fix, Uber and Ginger.io</p>
					</div>



					<div class="header AtlasTypewriter-Regular-Web" id="partnersHeader">VENTURE PARTNERS</div>
					<div class="nameJob">
						<p>Drew Uher</p>
						<p class="job">Founder and CEO at Homelight</p>
					</div>
					<div class="nameJob">
						<p>Jennifer Pollock</p>
						<p class="job">Head of content Marketing at Square</p>
					</div>
					<div class="nameJob">
						<p>Greg Pal</p>
						<p class="job">Founder and CBO at Automat.ai and VP at Nuance</p>
					</div>
					<div class="nameJobLast">
						<p>Daniele Codega</p>
						<p class="job">Partner at Work & Co. Previously Head of Design at Reuters, Creative Director at HuffPost</p>
					</div>
				</div>
			</div>
		</div>
      
      <div class="philosophy_footer footer">
	<p>Built by the 1984 team using Emacs (vim users can still apply)</p>
	<p>44 Tehama Street, San Francisco, CA</p>
	<p>Contact us:<br>
	  <span class="opacity">team@1984.vc</span></p>
      </div>
    </div>
    <div id="portfolio">
      <div class="container portfolio_container">
	<div class="header AtlasTypewriter-Regular-Web">PORTFOLIO</div>
	<div class="title">
	  Since 2017, we have partnered with outstanding entrepreneurs shaking up many antiquated industries.
	</div>
	<!--
	    <div class="custom-radios">
        <div>
          <input type="radio" id="color-3" name="color" value="color-3">
          <label for="color-3">
            <span>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
            </span>
          </label>
        </div>

        <div>
          <input type="radio" id="color-4" name="color" value="color-4">
          <label for="color-4">
            <span>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
            </span>
          </label>
        </div>
      </div>
      -->

   		<div id="filters">
				<label class="filter-label"><input type="radio" name="radio" checked="checked" id="all"><span class="first checkmark"></span>All</label>
				<label class="filter-label"><input type="radio" name="radio" id="ecommerce"><span class="checkmark"></span>eCommerce</label>
				<label class="filter-label"><input type="radio" name="radio" id="supplychain"><span class="checkmark"></span>Supply Chain</label>
				<label class="filter-label"><input type="radio" name="radio" id="proptech"><span class="checkmark"></span>Proptech</label>
				<label class="filter-label"><input type="radio" name="radio" id="fintech"><span class="checkmark"></span>Fintech</label>                        
				<label class="filter-label"><input type="radio" name="radio" id="healthcare"><span class="checkmark"></span>Healthcare</label>                                
				<label class="filter-label"><input type="radio" name="radio" id="saas"><span class="checkmark"></span>SaaS</label>
				<label class="filter-label"><input type="radio" name="radio" id="consumer"><span class="checkmark"></span>Consumer</label>
				<label class="filter-label"><input type="radio" name="radio" id="marketplace"><span class="checkmark"></span>Marketplace</label>
				<label class="filter-label"><input type="radio" name="radio" id="staffing"><span class="checkmark"></span>Staffing</label>	                  
			</div>
			<ul>
        <li class='filter-ecommerce filter-consumer '>Because Market, <span class='opacity'>Ecommerce site selling diapers to seniors</span></li>
        <li class='filter-healthcare '>Biocogniv, <span class='opacity'>AI for medical diagnostics</span></li>
        <li class='filter-supplychain filter-saas '>Bluecargo, <span class='opacity'>Optimizing container logistics</span></li>
        <li class='filter-proptech filter-fintech '>Brace, <span class='opacity'>Mortgage servicing for lenders</span></li>
        <li class='filter-proptech filter-saas '>BuildOps, <span class='opacity'>Driving operational efficiency for service contractors</span></li>
        <li class='filter-healthcare '>CareSignal, <span class='opacity'>Patient engagment software</span></li>
        <li class='filter-proptech filter-saas '>Convex, <span class='opacity'>Flexport for commercial contractors</span></li>
        <li class='filter-ecommerce filter-consumer filter-marketplace '>Curtsy, <span class='opacity'>Marketplace for Gen Z to buy and sell clothing</span></li>
        <li class='filter-healthcare '>Deepscribe, <span class='opacity'>Medical note transcription</span></li>
        <li class='filter-fintech filter-consumer '>Dovly, <span class='opacity'>Automated credit repair</span></li>
        <li class='filter-ecommerce filter-consumer '>Duffl, <span class='opacity'>Delivery for college campuses</span></li>
        <li class='filter-fintech filter-saas filter-marketplace'>Fairmarkit, <span class='opacity'>Marketplace for procurement</span></li>
        <li class='filter-ecommerce filter-supplychain filter-marketplace '>Flowspace, <span class='opacity'>Airbnb for warehousing</span></li>
        <li class='filter-ecommerce filter-consumer '>Frey, <span class='opacity'>Clothing and personal care</span></li>
<!--        <li class='filter-supplychain filter-saas '>GetSett, <span class='opacity'>Logistics Enhancment for Fleets</span></li>-->
        <li class='filter-healthcare '>Glidian, <span class='opacity'>Prior authorization software</span></li>
        <li class='filter-healthcare '>Health Note, <span class='opacity'>Automated note taking for healthcare</span></li>
        <li class='filter-staffing '>Heroes Jobs, <span class='opacity'>Video recruiting platform for Gen Z workers</span></li>
        <li class='filter-healthcare '>House RX, <span class='opacity'>Making specialty medication more accessible and affordable</span></li>	
        <li class='filter-supplychain filter-consumer '>Kyte, <span class='opacity'>Rental cars on demand</span></li>
        <li class='filter-proptech '>Latchel, <span class='opacity'>Property management solution for landlords</span></li>
        <li class='filter-supplychain filter-consumer '>Nickson, <span class='opacity'>Furniture as a service</span></li>
        <li class='filter-fintech filter-consumer '>Oxygen, <span class='opacity'>Banking for freelancers</span></li>
        <li class='filter-proptech filter-consumer '>Padsplit, <span class='opacity'>Airbnb for affordable housing</span></li>
        <li class='filter-saas '>Posthog, <span class='opacity'>Onprem analytics platform</span></li>
        <li class='filter-ecommerce filter-saas '>PostScript, <span class='opacity'>Ecommerce SMS re-engagement</span></li>
        <li class='filter-proptech filter-consumer '>Properly, <span class='opacity'>Opendoor for Canada</span></li>
        <li class='filter-proptech filter-saas '>Reggora, <span class='opacity'>Real estate appraisal software</span></li>
        <li class='filter-fintech filter-saas '>Routable, <span class='opacity'>Platform for scaling b2b payments</span></li>
        <li class='filter-supplychain filter-marketplace filter-staffing '>Seso, <span class='opacity'>Labor marketplace for the agriculture industry</span></li>
        <li class='filter-supplychain filter-fintech filter-saas filter-marketplace '>Shelf Engine, <span class='opacity'>Marketplace connecting grocery stores with vendors</span></li>
        <li class='filter-healthcare filter-staffing '>Sling Health, <span class='opacity'>Virtual care teams for medical practices</span></li>
        <li class='filter-ecommerce filter-supplychain filter-saas filter-marketplace '>Sourcify, <span class='opacity'>Connecting US merchants with Chinese factories</span></li>
        <li class='filter-ecommerce filter-saas filter-marketplace '>Statusphere, <span class='opacity'>Platform for word-of-mouth marketing</span></li>		
        <li class='filter-ecommerce filter-supplychain filter-saas '>Syrup, <span class='opacity'>Predictive analytics for retailers</span></li>	
        <li class='filter-healthcare filter-marketplace '>Terapify, <span class='opacity'>E-therapy for Latam</span></li>
        <li class='filter-proptech filter-marketplace filter-staffing '>Toolbox, <span class='opacity'>Staffing and payroll platform for construction workers</span></li>	
        <li class='filter-healthcare filter-marketplace filter-staffing '>Trusted Health, <span class='opacity'>Marketplace for healthcare employment</span></li>
        <li class='filter-supplychain filter-saas '>UnicoAero, <span class='opacity'>Baggage management system for airlines</span></li>
        <li class='filter-supplychain filter-saas '>Unioncrate, <span class='opacity'>Software for supply change management</span></li>
        <li class='filter-saas filter-marketplace'>Vectrix, <span class='opacity'>Cloud security marketplace</span></li>
        <li class='filter-supplychain filter-saas '>Vizion, <span class='opacity'>API for ocean freight</span></li>
        <li class='filter-ecommerce filter-consumer '>Zero, <span class='opacity'>Zero waste groceries</span></li>
			</ul>
      </div>
      <div class="portfolio_footer footer">
	<p>Built by the 1984 team using Emacs (vim users can still apply)</p>
	<p>44 Tehama Street, San Francisco, CA</p>
	<p>Contact us:<br>
	  <span class="opacity">team@1984.vc</span></p>
      </div>
    </div>
    <div id="newsletter">
      <div class="newsletter-top-container"> 
	<div class="header AtlasTypewriter-Regular-Web">RESOURCES</div>

	<div class="title">
	  <div id="newsletter_title">"Knowing whose advice to take and on what topic is the single most important decision an entrepreneur can make."</div>
	  <div id="newsletter_date" class="white">
	    &mdash; Vinod Khosla</div>
	</div>


	
	<div class="newsletter-top-right">
	  
	</div> 														
      </div> 															
      <div class="newsletter-bottom-container">      
	<div class="news-intro">
	  <div id="newsletter_body">
	    On Company Founding
	    <div class="news-item border-top" id="one">
	      <div>
		<a href="http://www.paulgraham.com/relres.html" target="_new">
		  <div class="number">1.</div><h1 class="AtlasTypewriter-Regular-Web">Want to start a comapny? be relentlessly resourceful <span class="opacity">– Paul Graham</span></h1>
		</a>
	      </div>
	      <div>
		<a href="http://www.paulgraham.com/ds.html" target="_new">
		  <div class="number">2.</div><h1 class="AtlasTypewriter-Regular-Web">Do Things that Don’t Scale <span class="opacity">– Paul Graham</span></h1>
		</a>
	      </div>
	      <div>
		<a href="https://www.geekwire.com/2011/wrong-answer-5050-calculating-cofounder-equity-split/" target="_new">
		  <div class="number">3.</div><h1 class="AtlasTypewriter-Regular-Web">The only wrong answer is 50/50: Calculating the co-founder equity split<span class="opacity">– Dan Shapiro</span></h1>
		</a>
	      </div>
	    </div>
	    
	    On Fundraising
	    <div class="news-item border-top" id="two">

	      <div>
		<a href="https://abovethecrowd.com/2015/07/07/in-defense-of-the-deck/" target="_new">
		  <div class="number">1.</div><h1 class="AtlasTypewriter-Regular-Web">In Defense of the Deck <span class="opacity">- Above the Crowd</span></h1>
		</a>
	      </div>
	      
	      <div>
		<a href="https://blog.initialized.com/2021/06/the-metrics-you-need-to-raise-a-series-a/" target="_new">
		  <div class="number">2.</div><h1 class="AtlasTypewriter-Regular-Web">Metrics to raise a Series A <span class="opacity">- initialized.com</span></h1>
		</a>
	      </div>
	      <div>
		<a href="https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29" target="_new">
		  <div class="number">3.</div><h1 class="AtlasTypewriter-Regular-Web">Retention metrics for founders <span class="opacity">- Lenny's Newsletter</span></h1>
		</a>
	      </div>
	    </div>

	    On Recruiting
	    <div class="news-item border-top" id="two">	    
	      <div>
		<a href="https://www.khoslaventures.com/gene-pool-engineering-for-entrepreneurs" target="_new">
		  <div class="number">1.</div><h1 class="AtlasTypewriter-Regular-Web">Gene Pool Engineering <span class="opacity">- Vinod Khosla</span></h1>
		</a>
	      </div>
	    </div>

	    On Operating
	    <div class="news-item border-top" id="two">	    	    
	      <div>
		<a href="https://www.lennysnewsletter.com/p/saas-pricing-strategy" target="_new">
		  <div class="number">1.</div><h1 class="AtlasTypewriter-Regular-Web">Pricing framework for SaaS companies <span class="opacity">- Lenny's Newsletter</span></h1>
		</a>
	      </div>

	      <div>
		<a href="https://sarahtavel.medium.com/the-hierarchy-of-marketplaces-introduction-and-level-1-983995aa218e"  target="_new">
		  <div class="number">2.</div><h1 class="AtlasTypewriter-Regular-Web">Framework for launching and scaling a marketplace business <span class="opacity">- Sarah Tavel</span></h1>
		</a>
		
	      </div>
	      <div>
		<a href="https://christophjanz.blogspot.com/2014/10/five-ways-to-build-100-million-business.html"  target="_new">
		  <div class="number">3.</div><h1 class="AtlasTypewriter-Regular-Web">5 ways to build a $100M revenue business <span class="opacity">- The Angel VC</span></h1>
		</a>
	      </div>
	      <div>
		<a href="https://abovethecrowd.com/2012/09/04/the-dangerous-seduction-of-the-lifetime-value-ltv-formula/" target="_new">
		  <div class="number">4.</div><h1 class="AtlasTypewriter-Regular-Web">The Dangerous Seduction of the Lifetime Value (LTV) Formula<span class="opacity"> - Bill Gurley</span></h1>
		</a>
	      </div>
	    </div>
	  </div> 
	</div>
      </div>
   
   <div class="news_footer footer">
      <p>Built by the 1984 team using Emacs (vim users can still apply)</p>
     <p>44 Tehama Street, San Francisco, CA</p>
     <p>Contact us:<br>
       <span class="opacity">team@1984.vc</span>
     </p>
   </div>
   </div>
	<div id="archive" class="clickable">
	  <div class="archive-top-container">
	    <div class="header AtlasTypewriter-Regular-Web">ON INVESTING</div>
	    <div class="archive-top-right"></div>
	  </div>
	  <div class="archive-bottom-container">
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>
	    <br/>	    
	    <br/>
	    <br/>
	    <br/>
	    <br/>	    
	    <br/>
	    <br/>
	    <br/>	    
	    <ul>
	      <li>Coming Soon</li>
			</ul>
		</div>
	</div>
</div>
	<script>
		/*/////////////////////////////////////////*/
		/*//////////   Z-INDEX CONTROL   //////////*/
		/*/////////////////////////////////////////*/
		var zzz = 0;


    var currTop = "#philosophy";
    var currMiddle = "#portfolio";
    $("#philosophy").data("pos",  0);
    $("#portfolio").data("pos", 1);    
    $("#newsletter").data("pos", 2);    

    currTop = "#philosophy";
    function updateMobile(clicked) {
	var mq = window.matchMedia( "(max-width: 700px)");
        if(mq.matches && currTop != clicked) {
	    
        $(currTop).data("pos", 1);
        $(currMiddle).data("pos", 2);	    
        $(clicked).data("pos", 0);
	currMiddle = currTop;
        currTop = clicked;
    
    /*
        if(clicked == "#philosophy") {
          $("#philosophy").data("pos", 0);          
          $("#portfolio").data("pos", 1);              
          $("#newsletter").data("pos", 2);
        } else if(clicked == "#newsletter") {
          $("#philosophy").data("pos", 1);          
          $("#portfolio").data("pos", 2);              
          $("#newsletter").data("pos", 0);
        } else if(clicked == "#portfolio") {
          $("#philosophy").data("pos", 2);          
          $("#portfolio").data("pos", 0);              
          $("#newsletter").data("pos", 1);
     
      }
      
      if(currTop == "#philosophy" && $(clicked).data("pos") == 2)  {
          (clicked == "#portfolio") ? $("#newsletter").data("pos", 2) : $("#portfolio").data("pos",2);
          $("#philosophy").data("pos", 1);          
       } else {
         $(currTop).data("pos", $(clicked ).data("pos"));
       }

      if($("#portfolio").data("pos") == 0 || $("#portfolio").data("pos") == 1) {
          $("#portfolio").css("transform", "translate(0px,0px)");
        } else {
         $("#portfolio").css("transform", "translate(40px,-40px)");
        }
        if($("#newsletter").data("pos") == 0 || $("#newsletter").data("pos") == 1) {
          $("#newsletter, #archive").css("transform", "translate(-40px,40px)");
        } else {
         $("#newsletter, #archive").css("transform", "translate(0px,0px)");
        }
*/
/*
        $("#philosophy").css("transform", "translate(" + $("#philosophy").data("pos") * 40 + "px," + $("#philosophy").data("pos") * -40 + "px)");
        $("#portfolio").css("transform", "translate(" + (1 - $("#portfolio").data("pos")) * -40 + "px," + (1 - $("#portfolio").data("pos")) * 40 + "px)");    
        $("#newsletter").css("transform", "translate(" + (2 - $("#newsletter").data("pos")) * -40 + "px," + (2 - $("#newsletter").data("pos")) * 40 + "px)");
        $("#archive").css("transform", "translate(" + (2 - $("#newsletter").data("pos")) * -40 + "px," + (2 - $("#newsletter").data("pos")) * 40 + "px)");    
*/
        $("#philosophy").css("z-index", 2 - $("#philosophy").data("pos"));
        $("#portfolio").css("z-index", 2 - $("#portfolio").data("pos"));
        $("#newsletter").css("z-index", 2 - $("#newsletter").data("pos"));
        $("#archive").css("z-index", 2 - $("#newsletter").data("pos"));        
        }
      }
    
    $("#philosophy").click(function(event) {
      updateMobile("#philosophy");
      event.stopPropagation();
    
    });
    $("#portfolio").click(function(event) {
      updateMobile("#portfolio");
      event.stopPropagation();
    });
    $("#newsletter, #archive").click(function(event) {
      updateMobile("#newsletter");
      event.stopPropagation();
    });

		$("#philosophy").hover(function() {
			zzz = zzz+10;
		  $(this).css('z-index', zzz);
		});
		$("#portfolio").hover(function() {
			zzz = zzz+10;
  		$(this).css('z-index', zzz);
		});
		$("#newsletter, #archive").hover(function() {
  		zzz = zzz+10;
			$("#archive").css('z-index', zzz-5);    
  		$("#newsletter").css('z-index', zzz);
		});
		$("#archive").click(function() {
      $(this).removeClass("clickable");
		  $(this).css('z-index', zzz+2);
			$("#newsletter").css('z-index', zzz);
		});
		
		
		/*/////////////////////////////////////////*/
		/*/////////   PORTFOLIO FILTERS   /////////*/
		/*/////////////////////////////////////////*/
    filters_list = ["ecommerce", "supplychain", "proptech", "fintech", "healthcare", "saas", "consumer", "marketplace", "staffing"]
		$("#all").click(function() {
		  if ($(this).is(':checked')) {
        for (let i = 0; i <filters_list.length; i++) {
  		     $(".filter-" + filters_list[i]).show();
        }
		  }
		});
    // Iterate through all the filters.  When one is clicked, hide all and show it
    for (let i = 0;  i < filters_list.length; i++) {
  	  $("#" + filters_list[i]).click(function() {
		 	  if ($(this).is(':checked')) {
          for (let j = 0; j <filters_list.length; j++) {
    		    $(".filter-" + filters_list[j]).hide();
          }
	 		  $(".filter-" + filters_list[i]).show();
		   }
		  });
    }
		
		
	</script>
</body>
</html>
