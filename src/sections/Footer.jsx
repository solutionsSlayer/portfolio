import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <a href="https://www.linkedin.com/in/dorian-doussain-799815306/" target="_blank" rel="noopener noreferrer">
                <img src={socialImg.imgPath} alt="social icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
