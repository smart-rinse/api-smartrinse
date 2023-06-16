const faq = [
    {
        "id" : "1",
        "question": "Apa itu aplikasi laundry?",
        "answer": "Aplikasi laundry adalah sebuah platform teknologi yang memungkinkan pengguna untuk menemukan layanan laundry berkualitas, memesan jasa laundry, dan memberikan umpan balik tentang pengalaman mereka."
    },
    {
        "id" : "2",
        "question": "Bagaimana cara menggunakan aplikasi laundry?",
        "answer": "Untuk menggunakan aplikasi laundry, Anda perlu mengunduh aplikasi dari playsotore, dan membuat akun pengguna. Setelah itu, Anda dapat mencari laundry terdekat, melihat ulasan dan rating, memilih layanan yang diinginkan, dan melakukan pemesanan melalui aplikasi."
    },
    {
        "id" : "3",
        "question": "Bagaimana saya dapat memilih laundry yang berkualitas?",
        "answer": "Aplikasi laundry menyediakan informasi tentang ulasan dan rating dari pelanggan sebelumnya. Anda dapat membaca ulasan tersebut untuk memilih laundry yang memiliki reputasi baik dan memberikan layanan berkualitas."
    },
    {
        "id" : "4",
        "question": "Bagaimana jika saya tidak puas dengan hasil cuci?",
        "answer": "Jika Anda tidak puas dengan hasil cuci, Anda dapat memberikan umpan balik melalui aplikasi. Tim pengembang aplikasi akan memperhatikan umpan balik Anda dan dapat memberikan solusi atau tindakan yang diperlukan."
    },
    {
        "id" : "5",
        "question": "Apa kelebihan dari aplikasi ini?",
        "answer": "Aplikasi ini dapat memberikan rekomendasi laundry berdasarkan review dan geolocation, dengan sistem ini Anda dapat mendapatkan layanan laundry yang terbaik"
    },
    {
        "id" : "6",
        "question": "Bagaimana cara melakukan pemesanan melalui aplikasi?",
        "answer": "Mudah sekali, Anda bisa mencari laundry sesuai dengan pilihan setelah itu Anda dapat memilih layanan laundrynya dan terdapat tombol proses maka pesanan anda akan diterima oleh owner laundrynya"
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
