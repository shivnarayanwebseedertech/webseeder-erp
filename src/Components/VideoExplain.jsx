"use client"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import {
  AiOutlinePlus,
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineFileText,
  AiFillYoutube,
  AiOutlineComment,
} from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa"

const HelpCard = ({ Icon, label, onClick, iconColor, bgColor }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-2`}>
      <Icon size={24} className={iconColor} />
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </button>
)

HelpCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  iconColor: PropTypes.string,
  bgColor: PropTypes.string,
}
HelpCard.defaultProps = {
  onClick: () => {},
  iconColor: "text-gray-600",
  bgColor: "bg-gray-100",
}

export default function VideoExplain({
  collapsed,
  title,
  subtitle,
  buttonLabel,
  buttonRoute,
  onButtonClick,
  videoId,
  imageSrc,
}) {
  const navigate = useNavigate()
  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "5.5rem",
  }

  // Decide which action to take on button click
  const handleClick = () => {
    if (typeof onButtonClick === "function") {
      onButtonClick()
    } else if (buttonRoute) {
      navigate(buttonRoute)
    }
  }

  const helpOptions = [
    {
      Icon: AiOutlineCalendar,
      label: "Book Demo",
      onClick: () => {},
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      Icon: AiOutlineComment,
      label: "Live Chat",
      onClick: () => {},
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      Icon: AiFillYoutube,
      label: "Video Tutorial",
      onClick: () => {},
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    },
    { Icon: AiOutlineMail, label: "Email Us", onClick: () => {}, iconColor: "text-blue-600", bgColor: "bg-blue-100" },
    {
      Icon: FaWhatsapp,
      label: "Whatsapp Chat",
      onClick: () => {},
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      Icon: AiOutlineFileText,
      label: "Documentation",
      onClick: () => {},
      iconColor: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ]

  return (
    <div style={wrapperStyle} className="flex flex-col items-center w-full overflow">
      {/* Media Section */}
      <div className="w-full max-w-sm aspect-video mb-8 flex items-center justify-center bg-gray-50 rounded-lg">
        {imageSrc ? (
          <img
            src="https://super-monitoring.com/blog/wp-content/uploads/2019/08/custom-contact-forms.png"
            alt="Logo"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Embedded Media"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>

      {/* Header and CTA */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      <button
        onClick={handleClick}
        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-12"
      >
        <AiOutlinePlus size={20} className="mr-2" />
        {buttonLabel}
      </button>

      {/* Help Section */}
      <div className="w-full max-w-4xl bg-gray-50 p-6 rounded-xl">
        <h3 className="text-center text-lg font-medium mb-6">Do you need help? We've got your back</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {helpOptions.map((item, idx) => (
            <HelpCard
              key={idx}
              Icon={item.Icon}
              label={item.label}
              onClick={item.onClick}
              iconColor={item.iconColor}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

VideoExplain.propTypes = {
  collapsed: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonRoute: PropTypes.string,
  onButtonClick: PropTypes.func,
  videoId: PropTypes.string,
  imageSrc: PropTypes.string,
}

VideoExplain.defaultProps = {
  collapsed: false,
  title: "Default Title",
  subtitle: "Default subtitle text.",
  buttonLabel: "Click Here",
  buttonRoute: "",
  onButtonClick: null,
  videoId: "",
  imageSrc: "",
}
