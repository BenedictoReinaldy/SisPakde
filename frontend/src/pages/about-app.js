import ukdcLogo from "../asset/ukdclogo.png";
import iflogo from "../asset/informatika.png";
import { Helmet } from "react-helmet";

export default function AboutApp() {
  return (
    <>
      <Helmet>
        <title>Tentang Kami</title>
      </Helmet>
      {/* BACKGROUND GRADIENT COLOR */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* CARD CONTAINER */}
        <div className="bg-primary p-6 md:p-12 m-4 md:mx-auto rounded-lg shadow-md w-full md:max-w-4xl">
          {/* JUDUL */}
          <h1 className="text-2xl md:text-4xl font-bebas mb-4 text-center">
            TENTANG APLIKASI SISPAKDE
          </h1>
          {/* TENTANG KAMPUS */}
          <div className="font-poppins mt-5 flex flex-col md:flex-row">
            <img
              alt="UKDC"
              src={ukdcLogo}
              className="w-full md:w-44 mb-4 md:mb-0 mx-auto md:mr-4"
            ></img>
            <p className="text-justify leading-7">
              Universitas Katolik Darma Cendika adalah sebuah Universitas
              dibawah naungan yayasan Katolik yang berada di Surabaya. Tepatnya
              di Jalan Dr. Ir. H. Soekarno No. 201, Klampis Ngasem, Kecamatan
              Sukolilo, Surabaya. Universitas Katolik Darma Cendika adalah
              sebuah Universitas dengan 7 prodi, salah satunya adalah program
              studi Ilmu Informatika.
            </p>
          </div>
          {/* TENTANG PENULIS */}
          <div className="font-poppins mt-5 flex flex-col md:flex-row">
            <p className="text-justify leading-7 mb-4 md:mr-4">
              Perancang sistem pakar ini adalah Benedicto Reinaldy Pramananditya
              dari Universitas Katolik Darma Cendika Surabaya yang menempuh
              studi strata 1 Ilmu Informatika. Perancangan sistem pakar
              klasifikasi penyakit diabetes ini adalah sebagai bukti
              penyelesaian tugas akhir saya di studi strata 1 Ilmu Informatika.
            </p>
            <img
              alt="UKDC"
              src={iflogo}
              className="w-full md:w-36 mx-auto"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
