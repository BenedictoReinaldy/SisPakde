import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import doctor1 from "../asset/doctor1.jpg";

// http://api.sispakde.dcinfor.org:8000/predict

export default function ListPertanyaan() {
  const initialFormData = {
    gender: 1,
    gdp: 0,
    gd2p: 0,
    tekanandarah: 0,
    usia: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState("");
  const [saran, setSaran] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    const isAnyInputEmpty = Object.values(formData).some(
      (value) => value === 0 || value === ""
    );
    const isGenderNotSelected = formData.gender === "0";
    setIsButtonDisabled(isAnyInputEmpty || isGenderNotSelected);
  }, [formData]);

  useEffect(() => {
    if (result === "Diabetes Mellitus tipe 1") {
      setSaran([
        "Segera berkonsultasi ke dokter poli penyakit dalam.",
        "Melakukan terapi insulin.",
      ]);
      setTextColor("text-red-500");
    } else if (result === "Diabetes Mellitus tipe 2") {
      setSaran([
        "Melakukan diet.",
        "Menjaga pola makan dengan mengonsumsi makanan berserat tinggi.",
        "Memperbaiki pola gaya hidup.",
        "Sering berolahraga dan melakukan aktifitas fisik.",
        "Mengurangi kebiasaan merokok",
        "Mengurangi konsumsi minuman manis",
      ]);
      setTextColor("text-yellow-500");
    }
  }, [result]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://api.sispakde.dcinfor.org/predict",
        formData
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
  };
  return (
    <>
      <Helmet>
        <title>List Pertanyaan</title>
      </Helmet>

      {/* MODAL SETELAH BUTTON ANALISA DI CLICK */}
      <dialog dialog id="my_modal_3" className="modal">
        <div className="modal-box w-9/12 max-w-5xl">
          <form method="dialog">
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-black"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hasil Analisa Sistem</h3>
          <p className={`mt-5 leading-8 uppercase text-xl ${textColor}`}>
            <b>{result}</b>
          </p>
          <div className="mt-5 leading-8">
            <h2>Saran untuk anda:</h2>
            <ul className="list-decimal">
              {saran.map((item, index) => (
                <li className="ml-5" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 leading-8">
            Segera berkonsultasi dan hubungi dokter poli penyakit dalam di rumah
            sakit terdekat anda. Atau anda bisa berkonsultasi dengan dokter poli
            penyakit dalam di Rumah Sakit Gotong Royong dengan mengakses portal
            link berikut:{" "}
            <a
              href="https://www.antrianrsgotongroyong.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <u>https://www.antrianrsgotongroyong.com/</u>
            </a>
          </p>
        </div>
      </dialog>

      {/* CARD KIRI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <div className="h-64 sm:h-full w-full">
            <img
              className="h-full w-full object-cover"
              src={doctor1}
              alt="DOCTOR"
            />
          </div>
        </div>

        {/* CARD KANAN */}
        <form
          className=" p-4 md:p-6 rounded-lg w-full max-w-xl mx-auto flex flex-col my-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl md:text-2xl font-bebas mb-2 text-center">
            Anda diharapkan mengisi data-data yang ada dibawah ini!
          </h1>
          {/* JENIS KELAMIN */}
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Pilih jenis kelamin</span>
            </label>
            <select
              className="select select-bordered w-full"
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
            >
              <option value="" disabled>
                Pilih Jenis Kelamin
              </option>
              <option value="1">Pria</option>
              <option value="2">Wanita</option>
            </select>
          </div>
          {/* GULA DARAH PUASA */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Masukkan nilai gula darah puasa anda
              </span>
              <div
                className="tooltip tooltip-left"
                data-tip="Gula darah puasa yang diinputkan minimal 50 dan maksimal 450! "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </label>
            <input
              type="number"
              name="gdp"
              value={formData.gdp}
              onChange={handleChange}
              placeholder="Ketik disini"
              className="input input-bordered w-full"
              min="50"
              max="450"
            />
            <label className="label"></label>
          </div>
          {/* GULA DARAH 2 JAM */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Masukkan nilai gula darah 2 jam PP anda
              </span>
              <div
                className="tooltip tooltip-left"
                data-tip="Gula darah 2 jam PP yang diinputkan minimal 50 dan maksimal 600! "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </label>
            <input
              type="number"
              name="gd2p"
              value={formData.gd2p}
              onChange={handleChange}
              placeholder="Ketik disini"
              className="input input-bordered w-full"
              min="50"
              max="600"
            />
            <label className="label"></label>
          </div>
          {/* TEKANAN DARAH */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Masukkan nilai tekanan darah anda
              </span>
              <div
                className="tooltip tooltip-left"
                data-tip="Tekanan darah yang diinputkan minimal 50 dan maksimal 180! "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </label>
            <input
              type="number"
              name="tekanandarah"
              value={formData.tekanandarah}
              onChange={handleChange}
              placeholder="Ketik disini"
              className="input input-bordered w-full"
              min="50"
              max="200"
            />
            <label className="label"></label>
          </div>
          {/* USIA */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Masukkan usia anda</span>
              <div
                className="tooltip tooltip-left"
                data-tip="Usia yang diinputkan adalah minimal 25 dan maksimal 85! "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </label>
            <input
              type="number"
              name="usia"
              value={formData.usia}
              onChange={handleChange}
              placeholder="Ketik disini"
              className="input input-bordered w-full"
              min="25"
              max="85"
            />
            <label className="label"></label>
          </div>

          {/* BUTTONS */}
          <div className="font-poppins text-lg flex items-center md:items-stretch justify-center flex-wrap">
            {/* BUTTON BERSIHKAN FORM */}
            <button
              type="button"
              onClick={handleClearForm}
              className="btn btn-outline btn-warning w-full md:w-40 mb-2 md:mb-0 md:mr-2"
            >
              BERSIHKAN FORM
            </button>

            {/* BUTTON ANALISA */}
            <button
              type="submit"
              className="btn btn-accent w-full md:w-40"
              onClick={() => {
                if (isButtonDisabled) {
                  alert("Mohon isi semua nilai sebelum menganalisa.");
                } else if (
                  formData.gdp < 50 ||
                  formData.gdp > 450 ||
                  formData.gd2p < 50 ||
                  formData.gd2p > 600 ||
                  formData.tekanandarah < 50 ||
                  formData.tekanandarah > 180 ||
                  formData.usia < 25 ||
                  formData.usia > 85
                ) {
                  alert(
                    "Harap periksa nilai input, pastikan sesuai dengan batas yang ditentukan."
                  );
                } else {
                  document.getElementById("my_modal_3").showModal();
                }
              }}
              disabled={
                isButtonDisabled ||
                formData.gdp < 50 ||
                formData.gdp > 450 ||
                formData.gd2p < 50 ||
                formData.gd2p > 600 ||
                formData.tekanandarah < 50 ||
                formData.tekanandarah > 180 ||
                formData.usia < 25 ||
                formData.usia > 85
              }
            >
              ANALISA
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
