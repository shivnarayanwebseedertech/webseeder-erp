import PropTypes from "prop-types"
import { AiOutlineCalendar, AiOutlineMail, AiOutlineFileText, AiFillYoutube, AiOutlineComment } from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa"

const HelpCard = ({ Icon, label, onClick, iconColor, bgColor }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
  >
    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-3`}>
      <Icon size={24} className={iconColor} />
    </div>
    <span className="text-sm text-gray-700 font-medium">{label}</span>
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

export default function HelpSupportCards({
  title = "Do you need help? We've got your back",
  helpOptions,
  className = "",
  showTitle = true,
  gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
}) {
  const defaultHelpOptions = [
    {
      Icon: AiOutlineCalendar,
      label: "Book Demo",
      onClick: () => console.log("Book Demo clicked"),
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      Icon: AiOutlineComment,
      label: "Live Chat",
      onClick: () => console.log("Live Chat clicked"),
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      Icon: AiFillYoutube,
      label: "Video Tutorial",
      onClick: () => console.log("Video Tutorial clicked"),
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      Icon: AiOutlineMail,
      label: "Email Us",
      onClick: () => console.log("Email Us clicked"),
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      Icon: FaWhatsapp,
      label: "Whatsapp Chat",
      onClick: () => console.log("Whatsapp Chat clicked"),
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      Icon: AiOutlineFileText,
      label: "Documentation",
      onClick: () => console.log("Documentation clicked"),
      iconColor: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ]

  const options = helpOptions || defaultHelpOptions

  return (
    <div className={`w-full bg-gray-50 p-6 rounded-xl ${className}`}>
      {showTitle && <h3 className="text-center text-lg font-medium mb-6 text-gray-900">{title}</h3>}
      <div className={`grid ${gridCols} gap-4`}>
        {options.map((item, idx) => (
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
  )
}

HelpSupportCards.propTypes = {
  title: PropTypes.string,
  helpOptions: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      iconColor: PropTypes.string,
      bgColor: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
  showTitle: PropTypes.bool,
  gridCols: PropTypes.string,
}
