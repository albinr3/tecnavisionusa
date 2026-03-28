--
-- PostgreSQL database dump
--

\restrict TmANhEbYlcypiB7AAfm0bbip8xOoPcokwchltSoZWsVgnTh9CclVfuRlxYjXfiS

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    icon text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Distributor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Distributor" (
    id text NOT NULL,
    name text NOT NULL,
    icon text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text,
    phone text NOT NULL,
    email text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "mapUrl" text
);


--
-- Name: Product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    model text NOT NULL,
    subtitle text,
    description text,
    badge text,
    rating integer DEFAULT 5 NOT NULL,
    "reviewsCount" integer DEFAULT 0 NOT NULL,
    "mainImage" text,
    "nightVisionImg" text,
    "appDemoImg" text,
    protection text,
    compression text,
    lens text,
    power text,
    "resolutionOpts" text[],
    "aiDetection" text[],
    guarantee text,
    support text,
    "categoryId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "aiSectionIcon" text,
    "appDemoBadge" text,
    "appDemoDesc" text,
    "appDemoTitle" text,
    "galleryImages" text[] DEFAULT ARRAY[]::text[],
    "guaranteeIcon" text,
    "nightVisionIcon" text,
    "specsSectionIcon" text,
    "supportIcon" text
);


--
-- Name: ProductVariant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProductVariant" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    manual text,
    datasheet text,
    price numeric(65,30),
    "productId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Quote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Quote" (
    id text NOT NULL,
    "productSlug" text,
    "productName" text NOT NULL,
    "clientName" text NOT NULL,
    "clientEmail" text NOT NULL,
    "clientPhone" text,
    company text,
    message text,
    status text DEFAULT 'pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Category" (id, name, slug, icon, description, "createdAt") FROM stdin;
cmlfjqw2h000028vzethww651	Accesorios	accesorios	settings_photo_camera	Accesorios para camaras	2026-02-09 19:09:59.128
cmlfjqw7n000128vz0cudy60i	Cámaras IP	camaras-ip	videocam	Cámaras de vigilancia	2026-02-09 19:09:59.315
cmlfjqw7q000228vze8ai92dy	Cerraduras Inteligentes	cerraduras-inteligentes	Fingerprint	Cerraduras Inteligentes	2026-02-09 19:09:59.318
cml5fn2fm0002lkvzgf02sp7k	NVR / Grabadores	nvr-grabadores	dns	Grabadores de video en red	2026-02-02 17:17:20.451
cmlfk4zcc0000dsvzyqj8o1no	Switch POE	switch-poe	switch_access_2		2026-02-09 19:20:56.556
\.


--
-- Data for Name: Distributor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Distributor" (id, name, icon, address, city, state, phone, email, "isActive", "createdAt", "updatedAt", "mapUrl") FROM stdin;
cml5fswvg00005wvzl3633f21	Seguridad Total RD	verified_user	Av. Winston Churchill #1100, Piantini, Santo Domingo	Santo Domingo	Distrito Nacional	+1 (809) 555-1234	contacto@seguridadtotalrd.com	t	2026-02-02 17:21:53.259	2026-02-02 17:21:53.259	\N
cml5fswvh00015wvzxa1i35hu	TechGuard Dominicana	security	Calle del Sol #45, Centro, Santiago	Santiago	Santiago	+1 (809) 555-5678	ventas@techguardrd.com	t	2026-02-02 17:21:53.259	2026-02-02 17:21:53.259	\N
cml5fswvh00025wvzbn53zm4k	Visión Segura	videocam	Av. Independencia #234, La Vega	La Vega	La Vega	+1 (809) 555-9012	info@visionsegura.do	t	2026-02-02 17:21:53.259	2026-02-02 17:21:53.259	\N
cml5fswvh00035wvzddriqv69	Integra Sistemas RD	shield	Av. Libertad #567, San Cristóbal	San Cristóbal	San Cristóbal	+1 (809) 555-3456	contacto@integrasistemas.do	t	2026-02-02 17:21:53.259	2026-02-02 17:21:53.259	\N
cml5fswvh00045wvzw92rh9fb	Protección Caribeña	lock	Calle Principal #89, Puerto Plata	Puerto Plata	Puerto Plata	+1 (809) 555-7890	ventas@proteccioncaribena.com	t	2026-02-02 17:21:53.259	2026-02-02 17:21:53.259	\N
cml5fswvh00055wvzsdjyupbw	SmartSecurity Punta Cana	business	Blvd. Turístico del Este Km 28, Bávaro	Punta Cana	La Altagracia	+1 (809) 555-2468	hello@smartsecpc.do	t	2026-02-02 17:21:53.259	2026-02-02 17:21:53.259	\N
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Product" (id, slug, name, model, subtitle, description, badge, rating, "reviewsCount", "mainImage", "nightVisionImg", "appDemoImg", protection, compression, lens, power, "resolutionOpts", "aiDetection", guarantee, support, "categoryId", "createdAt", "updatedAt", "aiSectionIcon", "appDemoBadge", "appDemoDesc", "appDemoTitle", "galleryImages", "guaranteeIcon", "nightVisionIcon", "specsSectionIcon", "supportIcon") FROM stdin;
cmlfjradm0004f8vz00d28c7m	camara-active-deterrence-bullet-drz37ya	CAMARA ACTIVE DETERRENCE BULLET	DRZ37YA	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/d1cd99ce-95df-46f3-95ce-86361b691199-DRZ37YA-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"6 Megapixel(3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.669	2026-02-09 19:10:17.669	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrae80005f8vzuw6ha0hf	camara-active-deterrence-turret-drb97ra	CAMARA ACTIVE DETERRENCE TURRET	DRB97RA	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/5cafa43d-ba2d-44f6-9583-3f9a44296f5a-DRB97RA-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"6 Megapixel(3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.694	2026-02-09 19:10:17.694	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjraej0006f8vz43vw1fac	camara-bullet-cz37ea	CAMARA BULLET	CZ37EA	Vigilancia inteligente de alta definición para hogares y negocios.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/9f06f791-f4b3-4b42-8f5e-7bbdc9aa57a9-CZ37EA-LOGO.png	/uploads/e3e2d154-1896-47f2-9253-eb03e97b239f-Gemini_Generated_Image_m0q7a2m0q7a2m0q7.png	\N	\N	\N	\N	\N	{"4 Megapixel(2K)","6 Megapixel(3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.704	2026-02-09 19:10:17.704	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjraew0007f8vzkvsx27o9	camara-fisheye-con-microfono-hd05	CAMARA FISHEYE CON MICROFONO	HD05	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/0e552583-69eb-41cd-88cf-91969ba3b42c-HD05-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"8 MP (4K Ultra)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.717	2026-02-09 19:10:17.717	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjraf70008f8vzvddpj1yw	camara-mini-domo-db63ba	CAMARA MINI DOMO	DB63BA	Vigilancia inteligente de alta definición para hogares y negocios.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/be8f73f2-18b9-4619-b64a-dae3c57a902f-DB63BA-LOGO.png	/uploads/b489a94a-6b9a-4cbe-9d46-43383bd5a0c7-Gemini_Generated_Image_m0q7a2m0q7a2m0q7.png	\N	\N	\N	\N	\N	{"6 Megapixel(3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.729	2026-02-09 19:10:17.729	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cml5fn2fz0004lkvzwm7g439m	bullet-cam-pro-ai	Bullet Cam	Pro AI	Vigilancia de última generación para entornos exigentes.	Combinando óptica de precisión con inteligencia artificial avanzada para una detección proactiva y cero falsas alarmas.	Enterprise Series	5	120	https://lh3.googleusercontent.com/aida-public/AB6AXuABVysAT65FMCOcGdgwnXhM53Op4tLtw_xD_kDMj8HFqMJTRzvq2LnKZriqyN4UZGimVCYAxU8ykqEJFfFHciulJlh6q4evmbR002AgL6pvmKyAT78t_VrC_oM984lDecA4hWYaWQhhjzDWEM4f1shw8Eec6hKaLP1tovEM4nyYLOsksLGqdtKwaWH0kzvWjbxGiA8-FVmlrhUwTnu8aBOblwS8neu5SKqkNmFpwWL5FO159Ru4wtGH6u972e5CsNgi7PWgj6ea0plb	https://lh3.googleusercontent.com/aida-public/AB6AXuBT2XFS6isbNQRUL19NfHoe_m1lTVIpFLX2y16lJGNNLcHiKv4W6D1UgRgOaY5hN6EJeoldybn4xQlJzdvq9DMpymO8C0JdkXpAlaKyaDM5RUS0j09yTWM7PIstXpuY1gzaE8AwLsa_YeFYn5wMfXj12UQPWeVUnVc4cA-emsVSgILJarVr1bU5yM3ic5g7lEBTyLvKyWfHNgHyH09h_Ivw0qmoT46y-RZIKkLUqBUlvbUuMjTwg_glP6RK3uZN6Y3KX79ibF7DwWRq	https://lh3.googleusercontent.com/aida-public/AB6AXuCWlH9yHrE2h1zJmXyJHHtbS8sLMwvxVREstM8-0x769YxFsrcdlyfDi4ivRRshQfpqTue1Yd107WtF_4vdSvcW-0b87VMd6aR_6uGK2Ui0hCxfWDYknnE_bIURxH8SApUKEM2wQx6iRC54bGfLSftnsVpbtG_4g_ufAQMc_nB4vgtC5ryqtqIXUANBBaugxAyXtSJK1dGoE_iNLb5iut7cQhh-TcksthYJYC0fWT8xjpOl5pmgWlnDwd7vn2998EyjB7cqdIF2Vn2x	IP67 Rating	H.265+	2.8mm Wide	PoE / 12V	{"4 Megapixel","6 Megapixel","8 MP (4K Ultra)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	\N	2026-02-02 17:17:20.541	2026-02-02 17:17:20.541	\N	\N	\N	\N	{}	\N	\N	\N	\N
cmlfjrafh0009f8vznisg8as3	camara-panoramica-bullet-dz58a	CAMARA PANORAMICA BULLET	DZ58A	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/9f50def0-d439-41ac-8b75-e34a02de35b7-DZ58A-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"4 Megapixel(2K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.739	2026-02-09 19:10:17.739	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrafs000af8vzl6vko3w2	camara-panoramica-db99ga	CAMARA PANORAMICA	DB99GA	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.	Best Seller	5	0	/uploads/db6992bd-0d80-42df-a980-1c1f8fdf214b-DB99GA-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"8 MP (4K Ultra)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.75	2026-02-09 19:10:17.75	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrag0000bf8vzpgkgbt71	camara-ptz-basica-hs20x-y7	CAMARA PTZ BASICA	HS20X-Y7	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/ff42acb5-e566-4636-8896-358714d5902c-HS20X-Y7-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"6 Megapixel (3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.759	2026-02-09 19:10:17.759	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjraga000cf8vzwgdhzp07	camara-ptz-premium-hs20x-hp4	CAMARA PTZ PREMIUM	HS20X-HP4	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/b46e5cb0-d130-44cb-a811-3a50becec350-HS20X-HP4-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"6 Megapixel (3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.768	2026-02-09 19:10:17.768	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjragj000df8vzciop15fw	camara-ptz-ys20x-y-ir	CAMARA PTZ	YS20X-Y(IR) 	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/549ee3b2-c8ad-44ce-b0d8-91bf86ec883f-YS20X-Y(IR)-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"6 Megapixel (3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.777	2026-02-09 19:10:17.777	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjragu000ef8vzfbz0y3yz	camara-turret-con-microfono-db93ba	CAMARA TURRET CON MICROFONO	DB93BA	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.	Best Seller	5	0	/uploads/84c414a9-3f36-4ce1-945d-11cacab4f6ea-DB93BA-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"4 Megapixel(2K)","6 Megapixel(3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.788	2026-02-09 19:10:17.788	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrah2000ff8vzfn21gvhd	camara-turret-dual-light-c-microfono-db97sa	CAMARA TURRET DUAL LIGHT C/ MICROFONO	DB97SA	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/10a3254a-1bbf-4f1c-aa43-9148edeb6d87-DB97SA-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"8 MP (4K Ultra)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.795	2026-02-09 19:10:17.795	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrah9000gf8vz7br8xi0l	camara-turret-premium-db97ka	CAMARA TURRET PREMIUM AUDIO DOBLE VIA	DB97KA	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.	Best Seller	5	0	/uploads/a8133507-120d-4da0-938c-b17d6c680249-DB97KA-LOGO.png	/NIGHT.png	\N	\N	\N	\N	\N	{"6 Megapixel(3K)"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cmlfjqw7n000128vz0cudy60i	2026-02-09 19:10:17.804	2026-02-09 19:10:17.804	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrahg000hf8vzwkdev97m	nvr-16-canales-tvg32p16-16-v3-iq	NVR 16 CANALES	TVG32P16-16-V3-IQ	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	CON IA	5	0	/uploads/d8a3a531-d7b3-4c9d-a0c0-540dd232af02-NVR3216-P16-V3-IQ-LOGO.png	/NIGHT.png	\N	2	12 MP	HDMI 4K / VGA	16	{"16 CANALES"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cml5fn2fm0002lkvzgf02sp7k	2026-02-09 19:10:17.811	2026-02-09 19:10:17.811	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{/uploads/779e2922-7296-4b85-b6d6-33d3ee34a8ad-WhatsApp-Image-2026-02-08-at-10.42.09-PM.jpeg}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrahp000if8vzh8xwjs2l	nvr-32-canales-tvg34p16-32-v3-iq	NVR 32 CANALES	TVG34P16-32-V3-IQ	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.	CON IA	5	0	/uploads/dc23d95f-fe7f-47bd-b30f-9a5362712e3e-NVR3432-P16-V3-IQ-LOGO.png	/NIGHT.png	\N	4	12 MP	HDMI 4K / VGA	16	{"32 CANALES"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cml5fn2fm0002lkvzgf02sp7k	2026-02-09 19:10:17.82	2026-02-09 19:10:17.82	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{/uploads/a7b83490-4352-40df-93bb-13406f8d79e3-WhatsApp-Image-2026-02-08-at-10.46.40-PM.jpeg}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrahv000jf8vz2ip2sqdw	nvr-8-canales-tvg31p8-08-v3	NVR 8 CANALES	TVG31P8-08-V3	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	CON IA	5	0	/uploads/8ddd484c-212a-48a0-a4f3-716b5e2593a7-NVR3104-P4-S3-LOGO.png	/NIGHT.png	\N	1	12	12	8	{"8 CANALES"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cml5fn2fm0002lkvzgf02sp7k	2026-02-09 19:10:17.826	2026-02-09 19:10:17.826	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{/uploads/c52d6017-9054-4968-8136-2302403f0715-WhatsApp-Image-2026-02-08-at-10.41.05-PM.jpeg}	verified_user	nightlight_round	settings_suggest	support_agent
cmlfjrai4000kf8vz2sinn9pi	nvr-8-canales-tvg31p8-s3	NVR 8 CANALES	TVG31P8-S3	Protege tu hogar y/o negocio con vigilancia inteligente, precisa y confiable.	Invierte en una solución de seguridad real, moderna y profesional. Olvídate de sistemas obsoletos y experimenta la tranquilidad de tener el control total.\n\n	Best Seller	5	0	/uploads/d1e50fb3-4c64-4531-9024-73958937a39e-NVR3104-P4-S3-LOGO.png	/NIGHT.png	\N	\N	8 MP	HDMI 4K / VGA	8	{"8 CANALES"}	{"Cruce de línea","Intrusión de área","Reconocimiento facial"}	3 años de cobertura	Línea directa B2B	cml5fn2fm0002lkvzgf02sp7k	2026-02-09 19:10:17.834	2026-02-09 19:10:17.834	psychology	Live Monitoring	Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.	Control total en la palma de tu mano.	{/uploads/25dfb3d1-fc1f-4fae-87ff-c5c31f220873-WhatsApp-Image-2026-02-08-at-10.48.37-PM.jpeg}	verified_user	nightlight_round	settings_suggest	support_agent
cml5fn2g40005lkvz0qz3zok6	guardian-eye-360	Guardian Eye	360 PTZ	Control total sin puntos ciegos.	Cámara PTZ motorizada con seguimiento automático y visión panorámica para cobertura completa de grandes espacios.	Best Seller	4	85	https://lh3.googleusercontent.com/aida-public/AB6AXuBcYVFB5kC7tjun_jwirTNe-5FVNKA3v-sbXYtmN3MPur7_T7v9im_4RF2ZWsep4E1QLbMt_NoEM-d760biLKeUTAy-m3QbcfFNXtWdMDimcYjT_uMsO3d43SpHULpU1pss2Ef6JAs_-mWjewmLnDKSyRey2gZweZjxkbG9aXmlPyiMQHOFCP6em9tcO7CyqjnNmI98WT0Cmsb-gmRKtUXYSefSkoQFcPDk9E0MdfsnZeNGJednbeP26msYLwTjT_oYE9sLqXF300Rk	https://lh3.googleusercontent.com/aida-public/AB6AXuBT2XFS6isbNQRUL19NfHoe_m1lTVIpFLX2y16lJGNNLcHiKv4W6D1UgRgOaY5hN6EJeoldybn4xQlJzdvq9DMpymO8C0JdkXpAlaKyaDM5RUS0j09yTWM7PIstXpuY1gzaE8AwLsa_YeFYn5wMfXj12UQPWeVUnVc4cA-emsVSgILJarVr1bU5yM3ic5g7lEBTyLvKyWfHNgHyH09h_Ivw0qmoT46y-RZIKkLUqBUlvbUuMjTwg_glP6RK3uZN6Y3KX79ibF7DwWRq	\N	IP66 Indoor/Outdoor	H.265	3.6mm - 12mm Zoom	PoE+	{"1080p HD","2K QHD"}	{"Seguimiento de Movimiento","Detección de Humanos","Alerta de Sonido"}	2 años de cobertura	Chat 24/7	\N	2026-02-02 17:17:20.547	2026-02-02 17:17:20.547	\N	\N	\N	\N	{}	\N	\N	\N	\N
\.


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProductVariant" (id, name, description, manual, datasheet, price, "productId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Quote; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Quote" (id, "productSlug", "productName", "clientName", "clientEmail", "clientPhone", company, message, status, "createdAt", "updatedAt") FROM stdin;
cmlfl4n8d0001dsvzbfrj23st	camara-turret-premium-db97ka	CAMARA TURRET PREMIUM AUDIO DOBLE VIA DB97KA	Albinmrodriguez	albinmrodriguez@gmail.com	\N	\N	Hola equipo de TecnaVision,\nDeseo una cotización para el producto: CAMARA TURRET PREMIUM AUDIO DOBLE VIA DB97KA.\nSlug del producto: camara-turret-premium-db97ka.\nURL del producto: http://localhost:3000/products/camara-turret-premium-db97ka.\nQuedo atento(a) a su respuesta.	completed	2026-02-09 19:48:40.477	2026-02-09 19:59:09.249
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7cb59aaf-ec38-4f58-ae25-69870df8f163	b0a548cb920f524f3989f4bdd3386e63ca897ea76332499236884aa415a05211	2026-02-02 13:16:29.318992-04	20260130004621_init	\N	\N	2026-02-02 13:16:29.296546-04	1
cb8ea332-956a-4c57-af07-5dab8b645b44	24372a23d0c6a20981bd4454706205347b5e766929563a777d3e7b1c909ac80b	2026-02-02 13:16:29.333392-04	20260130012949_add_product_variants	\N	\N	2026-02-02 13:16:29.319845-04	1
f3ad1bdb-0abe-4c9b-a787-f2d24b25827d	8ff127d86448afe4ba0007b6efbfcab709597032b5b9ee74dc397cf324038e52	2026-02-02 13:16:29.345458-04	20260130022113_add_distributor_model	\N	\N	2026-02-02 13:16:29.334224-04	1
f8810c18-fa60-4882-b207-61b35b984955	a0b2e0afde1ba84a30800e4fe8f9cbab3705d78add9a4470afd059cca9b19e6b	2026-02-02 13:16:29.34957-04	20260130030248_add_map_url	\N	\N	2026-02-02 13:16:29.346415-04	1
\.


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Distributor Distributor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Distributor"
    ADD CONSTRAINT "Distributor_pkey" PRIMARY KEY (id);


--
-- Name: ProductVariant ProductVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Quote Quote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Quote"
    ADD CONSTRAINT "Quote_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: ProductVariant ProductVariant_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict TmANhEbYlcypiB7AAfm0bbip8xOoPcokwchltSoZWsVgnTh9CclVfuRlxYjXfiS

