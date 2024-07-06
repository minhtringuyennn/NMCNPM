import { useNavigate } from "@tanstack/react-router";
import { Button, Card, Tag, Typography } from "antd";

const LandingPage = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Cà phê bồng bềnh",
      originalPrice: "30000",
      discountPrice: "25000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Trà thơm ngon",
      originalPrice: "20000",
      discountPrice: "15000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Bánh ngọt",
      originalPrice: "10000",
      discountPrice: "8000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Nước ép",
      originalPrice: "15000",
      discountPrice: "12000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Bánh mặn",
      originalPrice: "15000",
      discountPrice: "12000",
      image: "https://via.placeholder.com/200"
    }
  ];

  const cards2 = [
    {
      title: "Cà phê bồng bềnh",
      originalPrice: "30000",
      discountPrice: "25000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Trà thơm ngon",
      originalPrice: "20000",
      discountPrice: "15000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Bánh ngọt",
      originalPrice: "10000",
      discountPrice: "8000",
      image: "https://via.placeholder.com/200"
    },
    {
      title: "Nước ép",
      originalPrice: "15000",
      discountPrice: "12000",
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <>
      <div className="text-center bg-[url('/user/landing-page.png')] h-screen bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center h-full">
          <div className="text-left ml-32">
            <Typography.Title level={2} className="text-white font-bold">
              how are you today?
            </Typography.Title>
            <Typography.Paragraph>wanna have a cup of tea?</Typography.Paragraph>
            <Typography.Paragraph>-----------------------------</Typography.Paragraph>
          </div>
          <div className="text-right mt-24 mr-32">
            <Typography.Paragraph>just place an order,</Typography.Paragraph>
            <Typography.Paragraph>"nhà" will take care of you.</Typography.Paragraph>
          </div>
        </div>
      </div>
      <div className="h-screen bg-[url('/user/featured.png')] bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center items-center h-full gap-12">
          <Typography.Title level={2} className="text-white">
            <span className="underline">Featured products</span>
          </Typography.Title>
          <div className="flex flex-wrap justify-center gap-16 w-2/3">
            {cards.map((card) => (
              <Card className="shadow-lg bg-[#FFF9F5]">
                <img className="mb-4" src={card.image} alt={card.title} />
                <Typography.Title level={4}>{card.title}</Typography.Title>
                <div className="flex flex-col gap-1 mb-2">
                  <Typography.Text delete>
                    {card.originalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnđ
                  </Typography.Text>
                  <Typography.Text>{card.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnđ</Typography.Text>
                </div>
                <Button type="primary" className="w-full">
                  Order now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen bg-[url('/user/featured-2.png')] bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center items-center w-full h-full gap-12">
          <Typography.Title level={2} className="text-white items-center flex gap-2">
            <span>A Sympony of Flavors</span>
            <Tag color="orange" className="text-white">
              -20% for all tea
            </Tag>
          </Typography.Title>
          <div className="flex gap-16 ml-auto mr-12">
            {cards2.map((card) => (
              <Card className="shadow-lg bg-[#FFF9F5]">
                <img className="mb-4" src={card.image} alt={card.title} />
                <Typography.Title level={4}>{card.title}</Typography.Title>
                <div className="flex flex-col gap-1 mb-2">
                  <Typography.Text delete>
                    {card.originalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnđ
                  </Typography.Text>
                  <Typography.Text>{card.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnđ</Typography.Text>
                </div>
                <Button type="primary" className="w-full">
                  Order now
                </Button>
              </Card>
            ))}
          </div>
          <Typography.Title level={3} className="text-white mt-24 mr-auto ml-12 flex items-center gap-2">
            <span>Have you tried it before?</span>
            <Tag color="orange" className="text-white">
              #SWEET32
            </Tag>
          </Typography.Title>
          <div className="flex gap-16 mr-auto ml-12">
            {cards2.map((card) => (
              <Card className="shadow-lg bg-[#FFF9F5]">
                <img className="mb-4" src={card.image} alt={card.title} />
                <Typography.Title level={4}>{card.title}</Typography.Title>
                <div className="flex flex-col gap-1 mb-2">
                  <Typography.Text delete>
                    {card.originalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnđ
                  </Typography.Text>
                  <Typography.Text>{card.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnđ</Typography.Text>
                </div>
                <Button type="primary" className="w-full">
                  Order now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen">
        <div className="flex flex-col justify-center items-center h-full gap-12">
          <Typography.Title level={2}>The story of us</Typography.Title>
          <Typography.Paragraph>
            "nhà" is a cozy little café inspired by the desire to create a welcoming space where everyone feels at home.
          </Typography.Paragraph>
          <Button type="primary" className="w-fit" onClick={() => navigate({ to: "/about" })}>
            About us
          </Button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
