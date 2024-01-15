import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import doctor2 from "../asset/doctor2.jpg";
import doctor3 from "../asset/doctor3.png";
import paper from "../asset/paper.png";
import number from "../asset/100.png";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* CARD KIRI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <div className="h-full w-full bg-white">
            <img className="h-screen mx-auto" src={doctor2} alt="DOCTOR" />
          </div>
        </div>

        {/* CARD KANAN */}
        <div className="p-4 md:p-6 rounded-lg w-full max-w-xl mx-auto flex flex-col my-auto bg-primary">
          <div className="mb-5">
            <h2 className="text-black my-auto text-4xl font-bebas font-bold text-center tracking-widest mb-2">
              SISPAKDE
            </h2>
            <p className="font-poppins font-semibold text-center text-sm tracking-wider">
              Sistem Pakar klasifikasi Diabetes
            </p>
          </div>
          <div className="flex flex-col py-2 p-5 rounded-md text-black mb-5">
            <div className="flex">
              <img src={paper} alt="PAPER LOGO" className="my-auto w-24 h-24" />
              <p className="font-serif my-auto">
                Hasil akhir sistem adalah diagnosa, saran, serta pendaftaran
                konsultasi dengan dokter poli penyakit dalam
              </p>
            </div>
            <div className="flex mt-5">
              <img
                src={doctor3}
                alt="PAPER LOGO"
                className="my-auto w-24 h-24 p-2"
              />
              <p className="font-serif my-auto">
                Sistem pakar yang dibuat telah divalidasi oleh dr. Emilia Retno,
                Sp.PD.
              </p>
            </div>
            <div className="flex mt-5">
              <img
                src={number}
                alt="PAPER LOGO"
                className="my-auto w-24 h-24 p-2"
              />
              <p className="font-serif my-auto">
                Hasil akurasi sistem yang akurat dan tepat
              </p>
            </div>
          </div>
          <div className="flex justify-center font-poppins">
            <Link to="about-app">
              <button className="btn btn-outline mr-5">TENTANG APLIKASI</button>
            </Link>
            <Link to="/list-pertanyaan">
              <button className="btn btn-secondary px-7">MULAI</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
