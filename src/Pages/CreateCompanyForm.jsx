// src/CreateCompanyForm.jsx
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Auth and Setup Pages/Navbar";

const CreateCompanyForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    legalName: "",
    aliasName: "",
    businessType: [],
    industryType: [],
    registrationType: [],
    date: "",
    address1: "",
    address2: "",
    country: "India",
    pincode: "",
    state: "",
    city: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [dropdownsOpen, setDropdownsOpen] = useState({
    businessType: false,
    industryType: false,
    registrationType: false,
  });

  const businessRef = useRef();
  const industryRef = useRef();
  const registrationRef = useRef();

  const businessOptions = [
    "Retail",
    "Wholesale",
    "Distribution",
    "Trader",
    "Service",
    "Manufacturer",
    "Other",
  ];
  const industryOptions = [
    "Retail",
    "Manufacturing",
    "Information Technology",
    "Agriculture",
    "Healthcare",
    "Education",
    "Finance",
    "Telecommunications",
  ];
  const registrationOptions = [
    "Unregistered (Without GST)",
    "Unknown (Without GST)",
  ];

  const stateCityData = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bengaluru", "Mysore"],
    // … add your full list …
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (businessRef.current && !businessRef.current.contains(e.target)) {
        setDropdownsOpen((p) => ({ ...p, businessType: false }));
      }
      if (industryRef.current && !industryRef.current.contains(e.target)) {
        setDropdownsOpen((p) => ({ ...p, industryType: false }));
      }
      if (
        registrationRef.current &&
        !registrationRef.current.contains(e.target)
      ) {
        setDropdownsOpen((p) => ({ ...p, registrationType: false }));
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.companyName.trim()) errs.companyName = "Required";
    if (!formData.businessType.length) errs.businessType = "Required";
    if (!formData.industryType.length) errs.industryType = "Required";
    if (!formData.registrationType.length)
      errs.registrationType = "Required";
    if (!formData.address1.trim()) errs.address1 = "Required";
    if (!/^\d{6}$/.test(formData.pincode))
      errs.pincode = "Must be 6 digits";
    if (!formData.state) errs.state = "Required";
    if (!formData.city) errs.city = "Required";
    if (!/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Must be 10 digits";
    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      errs.email = "Invalid";
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleState = (e) => {
    const st = e.target.value;
    setFormData((p) => ({ ...p, state: st, city: "" }));
    setCities(stateCityData[st] || []);
    if (errors.state) setErrors((p) => ({ ...p, state: "" }));
  };

  const toggleDropdown = (field) =>
    setDropdownsOpen((p) => {
      const close = { businessType: false, industryType: false, registrationType: false };
      return { ...close, [field]: !p[field] };
    });

  const toggleOption = (field, opt) => {
    setFormData((p) => {
      const arr = p[field].includes(opt)
        ? p[field].filter((x) => x !== opt)
        : [...p[field], opt];
      return { ...p, [field]: arr };
    });
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted", formData);
      alert("Company Created!");
    }
  };

  const Required = () => <span className="text-red-500">*</span>;

  return (
    <div className="bg-[#e8f0fe] min-h-screen font-sans text-gray-900">
      <Navbar/>
      <header className="flex mt-1 items-center justify-between px-4 py-2 border-b bg-white">
        <button
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="text-blue-600 hover:underline text-xs"
        >
          ← I have a GST number
        </button>
        <div className="space-x-2">
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Company
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <section className="bg-white p-6 rounded space-y-6 text-sm">
          <h2 className="font-semibold text-base">Create New Company</h2>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {/* Basic Information */}
            <fieldset className="border rounded p-4 space-y-4">
              <legend className="px-2 -mt-3 bg-white text-sm font-semibold">
                Basic Information
              </legend>
              <div>
                <label className="block text-xs font-semibold">
                  Company Name <Required />
                </label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 text-xs ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs">{errors.companyName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business Type */}
                <div ref={businessRef}>
                  <label className="block text-xs font-semibold">
                    Business Type <Required />
                  </label>
                  <div
                    className={`w-full border rounded px-3 py-2 text-xs cursor-pointer ${
                      errors.businessType ? "border-red-500" : "border-gray-300"
                    }`}
                    onClick={() => toggleDropdown("businessType")}
                  >
                    {formData.businessType.length
                      ? formData.businessType.join(", ")
                      : "Select Business Type"}
                  </div>
                  {dropdownsOpen.businessType && (
                    <div className="absolute z-10 bg-white border rounded mt-1 max-h-40 overflow-auto text-xs">
                      {businessOptions.map((opt) => (
                        <div
                          key={opt}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => toggleOption("businessType", opt)}
                        >
                          <input
                            type="checkbox"
                            checked={formData.businessType.includes(opt)}
                            readOnly
                            className="mr-2"
                          />
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.businessType && (
                    <p className="text-red-500 text-xs">
                      {errors.businessType}
                    </p>
                  )}
                </div>

                {/* Industry Type */}
                <div ref={industryRef}>
                  <label className="block text-xs font-semibold">
                    Industry Type <Required />
                  </label>
                  <div
                    className={`w-full border rounded px-3 py-2 text-xs cursor-pointer ${
                      errors.industryType ? "border-red-500" : "border-gray-300"
                    }`}
                    onClick={() => toggleDropdown("industryType")}
                  >
                    {formData.industryType.length
                      ? formData.industryType.join(", ")
                      : "Select Industry Type"}
                  </div>
                  {dropdownsOpen.industryType && (
                    <div className="absolute z-10 bg-white border rounded mt-1 max-h-40 overflow-auto text-xs">
                      {industryOptions.map((opt) => (
                        <div
                          key={opt}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => toggleOption("industryType", opt)}
                        >
                          <input
                            type="checkbox"
                            checked={formData.industryType.includes(opt)}
                            readOnly
                            className="mr-2"
                          />
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.industryType && (
                    <p className="text-red-500 text-xs">
                      {errors.industryType}
                    </p>
                  )}
                </div>
              </div>

              {/* Registration & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div ref={registrationRef}>
                  <label className="block text-xs font-semibold">
                    Registration Type <Required />
                  </label>
                  <div
                    className={`w-full border rounded px-3 py-2 text-xs cursor-pointer ${
                      errors.registrationType
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => toggleDropdown("registrationType")}
                  >
                    {formData.registrationType.length
                      ? formData.registrationType.join(", ")
                      : "Select Registration Type"}
                  </div>
                  {dropdownsOpen.registrationType && (
                    <div className="absolute z-10 bg-white border rounded mt-1 max-h-40 overflow-auto text-xs">
                      {registrationOptions.map((opt) => (
                        <div
                          key={opt}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => toggleOption("registrationType", opt)}
                        >
                          <input
                            type="checkbox"
                            checked={formData.registrationType.includes(opt)}
                            readOnly
                            className="mr-2"
                          />
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.registrationType && (
                    <p className="text-red-500 text-xs">
                      {errors.registrationType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </fieldset>

            {/* Mailing & Contact Info */}
            <fieldset className="border rounded p-4 space-y-4">
              <legend className="px-2 -mt-3 bg-white text-sm font-semibold">
                Mailing Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold">
                    Address Line 1 <Required />
                  </label>
                  <input
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 text-xs ${
                      errors.address1 ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-xs">{errors.address1}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold">
                    Address Line 2
                  </label>
                  <input
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold">Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold">
                    Pincode <Required />
                  </label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                    className={`w-full border rounded px-3 py-2 text-xs ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs">{errors.pincode}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold">
                    State <Required />
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleState}
                    className={`w-full border rounded px-3 py-2 text-xs ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select State</option>
                    {Object.keys(stateCityData).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-xs">{errors.state}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold">
                    City <Required />
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 text-xs ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset className="border rounded p-4 space-y-4">
              <legend className="px-2 -mt-3 bg-white text-sm font-semibold">
                Contact Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold">
                    Mobile Number <Required />
                  </label>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full border rounded px-3 py-2 text-xs ${
                      errors.mobile ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs">{errors.mobile}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 text-xs ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateCompanyForm;
