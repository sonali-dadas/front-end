import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./AddressPage.css";

const AddressPage = () => {
    useEffect(() => {

        // save current page
        localStorage.setItem(
            "lastPage",
            window.location.pathname
        );

    }, []);

    const navigate = useNavigate();
    const [address, setAddress] = useState({
        unit: "",
        building: "",
        street: "",
        city: "",
        postalCode: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        // Allow only digits for postal code
        if (name === "postalCode") {

            const numericValue =
                value.replace(/\D/g, "");

            setAddress((prev) => ({
                ...prev,
                [name]: numericValue,
            }));

            return;
        }

        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleConfirm = async () => {

        if (!address.street || !address.city) {

            alert("Please fill in required fields");

            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/onboarding/apply",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({

                        unitFlat:
                            address.unit,

                        streetBuildingNumber:
                            address.building,

                        streetName:
                            address.street,

                        city:
                            address.city,

                        postalCode:
                            address.postalCode,

                    }),
                }
            );

            const data =
                await response.text();

            if (response.ok) {

                console.log(
                    "Address Saved:",
                    data
                );

                sessionStorage.setItem(
                    "allowPhone",
                    "true"
                );

                navigate("/phone");

            } else {

                alert(data);
            }

        } catch (error) {

            console.error(error);

            alert("Server Error");
        }
    };

    const isFormComplete = () => {

        return (
            address.unit.trim() !== "" &&
            address.building.trim() !== "" &&
            address.street.trim() !== "" &&
            address.city.trim() !== "" &&
            address.postalCode.trim() !== ""
        );
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="address-wrapper">
            <TopNavbar />
            <div className="address-container">
                {/* Header with Progress Bar */}
                <div className="address-header">
                    <div className="header-top">
                        <h2 className="header-title">Profile Setup</h2>
                        <span className="progress-percent">40%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="address-content">
                    <div className="address-form">
                        {/* Back Button */}
                        <button className="back-button" onClick={handleBack}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#0066FF" />
                            </svg>
                            <span>Back</span>
                        </button>

                        {/* Icon */}
                        <div className="address-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0066FF" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="address-title">Address</h1>
                        <p className="address-subtitle">As shown in your utility bill or bank statement.</p>

                        {/* Form Fields */}
                        <div className="form-group">
                            <label>Unit/Flat# (optional)</label>
                            <input
                                type="text"
                                name="unit"
                                value={address.unit}
                                onChange={handleChange}
                                placeholder="SS"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Street/Building Number (optional)</label>
                                <input
                                    type="text"
                                    name="building"
                                    value={address.building}
                                    onChange={handleChange}
                                    placeholder="SS"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Street Name</label>
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                placeholder="SS"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    placeholder="SS"
                                />
                            </div>
                            <div className="form-group">
                                <label>Postal Code (optional)</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={address.postalCode}
                                    onChange={handleChange}
                                    placeholder="SS"
                                />
                            </div>
                        </div>

                        <div className="button-container">
                            <button
                                onClick={handleConfirm}
                                disabled={!isFormComplete()}
                                className={`next-btn ${isFormComplete() ? "enabled" : "disabled"}`}
                            >
                                Confirm address
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
