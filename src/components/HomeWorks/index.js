/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
import React, {useRef, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

function HomeWorks() {
	const {t, i18n} = useTranslation();
	const [activeIndex, setActiveIndex] = useState(null);
	const itemRefs = useRef([]);
	const handleIntersection = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const index = itemRefs.current.indexOf(entry.target);
				setActiveIndex(index);
			}
		});
	};
	useEffect(() => {
		const options = {
			rootMargin: "0px",
			threshold: 1.0,
		};
		const observer = new IntersectionObserver(handleIntersection, options);
		itemRefs.current.forEach((ref) => observer.observe(ref));

		return () => {
			observer.disconnect();
		};
	}, []);
	const currentLanguage = i18n.language;
  const isJapanese = currentLanguage === 'jp';

	const items = [
		{
			id: 1,
			imgLink: "https://images.squarespace-cdn.com/content/v1/5eb624a9707ef42c472b42ec/00900994-9f04-4260-85f6-220debb6ed8c/434684871_920431673419453_8894548977249295541_n.jpg?format=2500w",
			title: "TAIS",
			description: t("WOKR.1"),
			url: `https://www.eggworm.jp/${false ? "jp" : "en"}/our-works/tais`,
		},
		{
			id: 2,
			imgLink: "https://images.squarespace-cdn.com/content/v1/5eb624a9707ef42c472b42ec/b3b854fe-fd8c-4e59-9d81-5c06f7329778/Screenshot+2024-04-16+173505.png?format=2500w",
			title: "ALEXANDRION GROUP",
			description: t("WOKR.2"),
			url: `https://www.eggworm.jp/${false ? "jp" : "en"}/our-works/alexandrion-group`,
		},
		{
			id: 3,
			imgLink: "https://images.squarespace-cdn.com/content/v1/5eb624a9707ef42c472b42ec/499a2472-9885-4594-b1cc-3e65dc12a371/Untitled+%281%29+copy+2.png?format=2500w",
			title: "NOTION",
			description: t("WOKR.3"),
			url: `https://www.eggworm.jp/${false ? "jp" : "en"}/our-works/notion`,
		},
	];

	return (
		<section className="home-works" id="our-work">
			<header className="home-works-header">
				<h2 className="home-works-title">WORKS</h2>{" "}
				{/* <a href="/works/" className="home-works-all-link arrow-button active">
					<span className="text">View All</span> <span className="arrow"></span> <span className="line"></span>
				</a> */}
			</header>
			<div className="home-works-list">
				{items.map((item) => (
					<div className={`home-works-item ${item.id === activeIndex ? "active" : ""}`} key={item.id} ref={(el) => (itemRefs.current[item.id] = el)}>
						<div className="home-works-item__inner">
							<a href={item.url} className="home-works-item__image">
								<div className="image loaded" lazy="loaded" style={{backgroundImage: `url(${item.imgLink})`}}></div>
							</a>
							<div className="home-works-info">
								<h3 className="home-works-info__title">{item.title}</h3>
								<p className="home-works-info__text">{item.description}</p>{" "}
								<a href={item.url} className="home-works-link arrow-button active">
									<span className="text">{t("WOKR.detail")}</span> <span className="arrow"></span> <span className="line"></span>
								</a>
							</div>
							<div className="cover"></div>
						</div>
					</div>
				))}
			</div>
			<footer className="home-works-footer">
				<a href={i18n.language === "jp" ? "https://www.eggworm.jp/jp/our-works" :"https://www.eggworm.jp/en/our-works"} className="home-works-footer__link">
				{t("WOKR.all")}<span></span>
				</a>
			</footer>
		</section>
	);
}

export default HomeWorks;
