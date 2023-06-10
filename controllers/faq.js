const faq = [
    {
        "id" : "1",
        "question": "Bagaimana cara kerja aplikasi ini?",
        "answer": "Aplikasi ini memungkinkan Anda untuk melakukan pemesanan laundry dengan menginisiasi percakapan melalui chat dengan penyedia jasa laundry."
    },
    {
        "id" : "2",
        "question": "Bagaimana cara menemukan layanan laundry untuk diajak berchatting?",
        "answer": "Aplikasi ini menyediakan daftar penyedia jasa laundry yang mendukung pemesanan melalui chat. Anda dapat menjelajahi opsi yang tersedia, melihat profil mereka, dan memulai percakapan dengan penyedia jasa pilihan Anda."
    },
    {
        "id" : "3",
        "question": "Bagaimana cara membayar layanan laundry?",
        "answer": "Metode pembayaran dapat bervariasi tergantung pada penyedia jasa. Beberapa mungkin menawarkan opsi pembayaran online melalui aplikasi, sementara yang lain menerima pembayaran tunai atau memberikan pengaturan pembayaran alternatif."
    },
    {
        "id" : "4",
        "question": "Jika saya memiliki instruksi khusus untuk pesanan laundry, bagaimana caranya?",
        "answer": "Anda dapat berkomunikasi langsung dengan penyedia jasa melalui chat untuk memberikan instruksi khusus atau preferensi untuk pesanan laundry Anda. Mereka akan mencatat persyaratan Anda dan memastikan instruksi tersebut diikuti selama proses pencucian."
    },
    {
        "id" : "5",
        "question": "Apakah saya bisa memberikan penilaian dan ulasan untuk layanan laundry setelah menggunakan sistem pemesanan melalui chat?",
        "answer": "Ya, Anda dapat memberikan umpan balik, memberi penilaian, dan menulis ulasan berdasarkan pengalaman Anda dengan penyedia jasa laundry. Umpan balik ini akan membantu pengguna lain dalam membuat keputusan yang tepat saat memilih layanan laundry."
    },
    {
        "id" : "6",
        "question": "Apakah informasi pribadi saya dibagikan kepada penyedia jasa selama chat?",
        "answer": "Informasi pribadi Anda, termasuk percakapan chat, biasanya dijaga kerahasiaannya dan tidak dibagikan kepada pengguna lain atau penyedia jasa. Aplikasi ini harus menjunjung tinggi privasi pengguna dan perlindungan data."
    },
    {
        "id" : "7",
        "question": "Apa kelebihan dari aplikasi ini?",
        "answer": "Aplikasi ini dapat memberikan rekomendasi laundry berdasarkan review dan geolocation, dengan sistem ini Anda dapat mendapatkan layanan laundry yang terbaik"
    },
]

export const faqApps = async (req, res) => {
    try {
        res.json({
            success: true,
            statusCode: res.statusCode,
            message: "FAQ is ready",
            faq
          });
    } catch (error) {
        console.log(error);
    }
}