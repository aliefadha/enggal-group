import React from 'react';

interface PromoCardProps {
  id?: number | string; // Made optional since it's only used for React keys in parent
  title: string;
  description: string;
  validUntil: string;
  image: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ title, description, validUntil, image }) => {
  return (
    <div className="flex flex-col bg-[#F7F7F7] rounded-tl-[6px] rounded-tr-[6px] rounded-b-2xl h-full">
      {/* Expiration date section at the top */}
      <div className="bg-[#FFB835] px-3.5 py-3 flex items-center justify-center rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[16px] rounded-br-[16px]">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V9H18ZM13 0C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1V2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V7H0V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V2H12V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0Z" fill="#9C0000" />
          </svg>

          <span className="text-xs font-medium text-[#9C0000]">Berlaku Hingga <strong>{validUntil}</strong></span>
        </div>
      </div>

      <div className="relative my-4 w-full h-56 md:h-72 lg:h-80 px-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x350?text=Promo+Image";
          }}
        />
      </div>

      {/* Text section */}
      <div className="pb-6">
        <div className="flex flex-col gap-2 font-jakarta px-4 w-full">
          <span className="text-[14px] lg:text-xl font-bold">{title}</span>
          <h3 className="text-[#9B9B9B] text-[14px] lg:text-base/[24px] line-clamp-2">{description}</h3>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
