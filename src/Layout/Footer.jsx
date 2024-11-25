import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#8B4513] to-[#654321] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-[#DEB887] font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-[#F5DEB3] hover:text-[#DAA520] text-sm"
                >
                  Hair Harmony Star Rail
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-[#F5DEB3] hover:text-[#DAA520] text-sm"
                >
                  Dịch vụ tóc
                </a>
              </li>
              <li>
                <a
                  href="/locations"
                  className="text-[#F5DEB3] hover:text-[#DAA520] text-sm"
                >
                  Tìm Hair Harmony Star Rail gần nhất
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[#DEB887] font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-[#F5DEB3] text-sm">Hotline: 1900.10.JQ.KA</li>
              <li className="text-[#F5DEB3] text-sm">Đặt lịch: 0967.10.JQKA</li>
              <li className="text-[#F5DEB3] text-sm">
                Email: info@hairharmonystarrail.com
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[#DEB887] font-semibold mb-4">Giờ làm việc</h3>
            <p className="text-[#F5DEB3] text-sm">
              Thứ 2 đến Chủ Nhật
              <br />
              8h00 - 20h00
            </p>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[#DEB887] font-semibold mb-4">Tải ứng dụng</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-[#F5DEB3] hover:text-[#DAA520] text-sm"
              >
                <img src="/assets/image/AppStore.png" className="h-10 w-30" />
              </a>
              <a
                href="#"
                className="text-[#F5DEB3] hover:text-[#DAA520] text-sm"
              >
                <img src="/assets/image/GooglePlay.png" className="h-10 w-30" />
              </a>
            </div>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-[#DEB887] font-semibold mb-4">Cộng đồng</h3>
            <div className="space-y-2">
              <p className="text-[#F5DEB3] text-sm">600k follow TikTok</p>
              <p className="text-[#F5DEB3] text-sm">130k follow YouTube</p>
              <p className="text-[#F5DEB3] text-sm">200k follow Facebook</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#A0522D] pt-4">
          <p className="text-[#F5DEB3] text-xs text-center">
            © 2024 Hair Harmony Star Rail / Địa chỉ: 123 Đường ABC, P. XYZ, Q.
            DEF, HN / GPĐKKD số 010.7467.693 do Sở KHĐT TP.HN cấp ngày
            08/06/2016.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
