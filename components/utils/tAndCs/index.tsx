"use client";

import { useSetAtom } from "jotai";
import { animateScroll as scroll } from "react-scroll"
import { geoAtom } from "@/app/_components/atoms/geoAtom";

export const TAndCs = () => {
  const setGeo = useSetAtom(geoAtom);

  const scrollToBottom = () => {
    const element = document.getElementById("gimme-scrollbar");
    if (element) {
      scroll.scrollToBottom({
        containerId: "gimme-scrollbar",
        duration: 1000,
        smooth: true,
        offset: 0,
      });
    }
  };

  return (
    <main className="relative h-screen w-screen bg-[url('/images/bg-goldiswap.png')] bg-cover bg-bottom">
      <div className="absolute top-[7.5%] left-[5%] md:left-[20%] h-[85%] w-9/10 md:w-3/5 border-2 border-black bg-[#EEDCD2]">
        <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute right-0 bottom-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA]">
          <div className="relative size-full">
            <div
              className="font-amaticbold flex size-full flex-col overflow-y-auto p-[7.5%] text-center text-[3vw] font-medium text-black lg:text-[1.5vw]"
              id="gimme-scrollbar"
            >
              <p className="text-[7.5vw] font-bold lg:text-[5vw]">
                Terms of Service
              </p>
              <p>Last Updated: September 17, 2024</p>
              <p>
                This page explains the terms by which you may use the websites,
                including without limitation www.goldilocksdao.io and all of its
                subdomains (collectively, the “Site”), Company Content (as
                defined below) and the Services (as defined below) of Locks Defi
                Corp. (“we”, “our” and “us”). By accessing or using the Site or
                the Services, you signify on your behalf and any person or
                entity that you represent that you have read, understood, and
                agree to be bound by these terms of service (the “Agreement”),
                whether or not you are a registered user of our Site or the
                Services. We reserve the right to make unilateral modifications
                to these terms and will provide notice of these changes as
                described below. This Agreement applies to all visitors, users,
                and others who access the Site or the Services (“you” and
                “your”).
              </p>
              <p>
                Please read this Agreement carefully to ensure that you
                understand each provision.
              </p>
              <p>
                NONE OF THE SITE OR THE SERVICES ARE OFFERED TO PERSONS OR
                ENTITIES WHO ARE BLOCKED PERSONS (AS DEFINED BELOW), SANCTIONED
                PERSONS (AS DEFINED BELOW) OR RESTRICTED PERSONS (AS DEFINED
                BELOW).
              </p>
              <p>
                1. Our Site and Services (a) As part of the Site, we provide a
                user interface (the “Platform”) to access the smart contracts,
                decentralized applications, APIs and all other software that
                have been developed for the Goldilocks Protocol and execution of
                transactions with cryptocurrencies, digital tokens or coins and
                other blockchain-based assets (collectively, “Digital Assets”)
                in a decentralized, peer-to-peer manner, including without
                limitation Goldiswap, Goldilend and Goldivaults (the
                “Protocol”). This Agreement governs your use of our Site, the
                Platform, the Protocol, and all related tools, applications,
                data, software and other services provided by us (collectively,
                the “Services”). (b) By accessing or using the Site or the
                Services, you agree that we do not provide execution,
                settlement, or clearing services of any kind and are not
                responsible for the execution, settlement, or clearing of
                transactions automated through the Services.
              </p>
              <p>
                2. Use of Our Site and Services (a) Eligibility (i) This is a
                contract between you and us. You must read and agree to the
                terms of this Agreement before using the Site and the Services.
                If you do not agree, you may not use the Site and the Services.
                You may use the Site and the Services only if you can form a
                binding contract with us, and only in compliance with this
                Agreement and all applicable: (A) laws, constitutions, treaties,
                statutes, codes, ordinances, principles of common and civil law
                and equity, orders, decrees, rules, regulations and municipal
                by-laws, whether domestic, foreign or international; (B)
                judicial, arbitral, administrative, ministerial, departmental
                and regulatory judgments, orders, writs, injunctions, decisions,
                rulings, decrees and awards of any: (1) multinational or
                supranational body or organization, nation, government, state,
                province, country, territory, municipality, quasi-government,
                administrative, judicial or regulatory authority, agency, board,
                body, bureau, commission, instrumentality, court or tribunal or
                any political subdivision thereof, or any central bank (or
                similar monetary or regulatory authority) thereof, any taxing
                authority, any ministry or department or agency of any of the
                foregoing; (2) self-regulatory organization or stock exchange;
                (3) entity exercising executive, legislative, judicial,
                regulatory or administrative functions of or pertaining to
                government; and (4) corporation or other entity owned or
                controlled, through stock or capital ownership or otherwise, by
                any of such entities or other bodies pursuant to the foregoing
                (“Governmental Authority”); and (C) policies, practices and
                guidelines of, or contracts with, any Governmental Authority,
                which, although not actually having the force of law, are
                considered by such Governmental Authority as requiring
                compliance as if having the force of law, as the same may be
                amended from time to time and any successor thereto and in each
                case binding on or affecting the person or entity, or the assets
                of the person or entity, referred to in the context in which
                such word is used; (collectively, “Applicable Laws”). (ii) If
                you are under the age of majority in your jurisdiction of
                residence, you may use the Site or the Services only with the
                consent of or under the supervision of your parent or legal
                guardian. The Site and the Services are not available to any
                person previously removed from the Site or the Services by us.
                (iii) By entering or using this Site or the Services you
                represent that you: (A) have the right, authority and capacity
                to enter into this Agreement on behalf of yourself and the
                person or entity that you represent (if applicable); (B) are not
                prohibited from entering or using this Site or the Services or
                transacting with the Protocol under any Applicable Laws; (C)
                understand the risks associated with using our Site and the
                Services, including using the Protocol; (D) understand that you
                will be dealing with third parties and we have not verified and
                will not be in a position to verify any transaction you make
                using the Protocol; (E) are not a Restricted Person, Sanctioned
                Person or Blocked Person or acting on behalf or under the
                authority, instruction or employment of a Restricted Person,
                Sanctioned Person or Blocked Person; (F) do not intend to
                transact with any Restricted Person or Sanctioned Person; or (G)
                do not, and will not, use a VPN or any other privacy or
                anonymization tools or techniques to circumvent, or attempt to
                circumvent, any restrictions that apply to the Services.
              </p>
              <p>
                (b) User Responsibilities; Wallet (i) In order to use certain
                features of the Site and Services, you may be required to
                connect to your digital asset wallet or address (“Wallet”) to
                the Platform. You acknowledge that we are not responsible for
                transferring, safeguarding, or maintaining your private keys or
                any assets associated with your Wallet. If you lose, mishandle
                or have stolen your Wallet private keys, you acknowledge that
                you may not be able to recover associated assets and that we are
                not responsible for such loss. (ii) You acknowledge that you may
                disconnect your Wallet from the Platform at any time. (iii) You
                agree to notify us immediately if you suspect your linked Wallet
                has been compromised or otherwise suspect any security issues
                related to your use of the Services. (iv) You agree that you
                will not use the Services to transact with any Digital Asset
                that may be considered a security under Applicable Laws. (v) You
                acknowledge and agree that we may restrict, suspend or close
                your Wallet and access to the Platform for any reason or no
                reason, including if we reasonably believe that you have
                breached any of the terms of this Agreement. (vi) Digital Assets
                that you purchase or use in relation to the Services may be held
                in one or more Wallets of yours. We do not operate, maintain,
                control or have custody over any contents of your Wallet. We
                accept no responsibility for, or liability to, you in connection
                with your Wallet and make no representations or warranties
                regarding how the Platform or the Services will operate with any
                specific Wallet. Any issues relating to your Wallet should be
                addressed to your Wallet provider. (vii) You must provide all
                equipment, connectivity, and software necessary to connect to
                the Service. You are solely responsible for any costs and
                expenses, including Internet connection or mobile fees, which
                you incur when accessing the Services. (viii) You acknowledge
                that we are not responsible for, and you agree to indemnify us
                for, any loss or damage arising from your failure to comply with
                the requirements hereunder. (c) Access and Use of the Site and
                Services (i) Subject to the terms and conditions of this
                Agreement, you are hereby granted a non-exclusive, limited,
                non-transferable, non-sublicensable and freely revocable right
                to use the Site and the Services. We reserve all rights not
                expressly granted herein in the Site, the Services and the
                Company Content (as defined below). We may terminate this right
                of use, in whole or in part, at any time for any reason or no
                reason. (ii) You agree that rights granted to you in this
                Agreement are subject to, and you covenant to abide with, the
                following restrictions: (A) you shall not use the Site or the
                Services from a jurisdiction that we have, in our sole
                discretion, determined is a jurisdiction where the use of the
                Site or the Services is prohibited, including without limitation
                the United States or a Restricted Territory (as defined below);
                (B) you shall not license, sell, rent, lease, transfer, assign,
                distribute, host, or otherwise commercially exploit the Site or
                the Services, whether in whole or in part, or any content
                displayed on the Site or the Services; (C) you shall not modify,
                make derivative works of, disassemble, reverse compile or
                reverse engineer any part of the Site or the Services; (D) you
                shall not access the Site or the Services in order to build a
                similar or competitive websites, product, or service; (E) except
                as expressly stated herein, no part of the Site or the Services
                may be copied, reproduced, distributed, republished, downloaded,
                displayed, posted or transmitted in any form or by any means;
                (F) in connection with using the Services, you only will
                transfer legally-obtained Digital Assets that belong to you; and
                (G) you shall not use the Site or the Services other than as
                permitted hereunder. (iii) Unless otherwise indicated, any
                future release, update, or other addition to the functionality
                of the Site and Services shall be subject to this Agreement. All
                copyright and other proprietary notices on the Site (or on any
                content displayed on the Site) must be retained on all copies
                thereof. (iv) You acknowledge and agree that: (A) we have no
                obligation to provide you with any support or maintenance in
                connection with the Site and the Services; (B) the pricing
                information and other data provided on the Site or the Platform
                does not represent (1) an offer, a solicitation of an offer, or
                recommendation to enter into, a transaction with us or (2) any
                advice regarding a transaction entered into using the Site, the
                Platform and the Services; (C) we do not act as an agent for you
                or any other user of the Site, the Platform or the Services; (D)
                you are solely responsible for your use of the Services,
                including all of your transfers of Digital Assets; (E) to the
                fullest extent not prohibited by Applicable Law, we owe no
                fiduciary duties or liabilities to you or any other party, and
                that to the extent any such duties or liabilities may exist at
                law or in equity, you hereby irrevocably disclaim, waive, and
                eliminate those duties and liabilities; (F) you are solely
                responsible for reporting and paying any taxes applicable to
                your use of the Services; and (G) we have no control over, or
                liability for, the delivery, quality, safety, legality, or any
                other aspect of any Digital Assets that you may transfer to or
                from a third party, and we are not responsible for ensuring that
                an entity with whom you transact completes the transaction or is
                authorized to do so, and if you experience a problem with any
                transactions in Digital Assets using the Services, then you bear
                the entire risk. (v) You acknowledge and agree that the Services
                are non-custodial. When you deposit Digital Assets into any
                smart contract, you retain control over those Digital Assets at
                all times. The private key associated with the Wallet from which
                you transfer Digital Assets is the only private key that can
                control the Digital Assets you transfer into the smart
                contracts. In some cases, you may withdraw Digital Assets from
                any smart contract only to the Wallet from which you deposited
                the Digital Assets.
              </p>
              <p>
                (d) Acceptable Use (i) You agree not to engage in any of the
                following prohibited activities: (A) copying, distributing, or
                disclosing any part of the Site or the Services in any medium,
                including without limitation by any automated or non-automated
                “scraping”; (B) using any automated system, including without
                limitation “robots”, “spiders” and “offline readers” to access
                the Site or the Services in a manner that sends more request
                messages to our servers than a human can reasonably produce in
                the same period of time by using a conventional on-line web
                browser (except that we grant the operators of public search
                engines revocable permission to use spiders to copy publicly
                available materials from the Site for the sole purpose of and
                solely to the extent necessary for creating publicly available
                searchable indices of the materials, but not caches or archives
                of such materials); (C) transmitting spam, chain letters, or
                other unsolicited email or messages through the Site or the
                Services; (D) attempting to interfere with, compromise the
                system integrity or security of or decipher any transmissions to
                or from the servers running the Site or the Services; (E) taking
                any action that imposes, or may impose at our sole discretion an
                unreasonable or disproportionately large load on our
                infrastructure; (F) uploading invalid data, viruses, worms, or
                other software agents through the Site or the Services; (G)
                collecting or harvesting any personally identifiable
                information, including account names, from the Site or the
                Services; (H) using the Site or the Services for any commercial
                solicitation purposes; (I) impersonating another person or
                otherwise misrepresenting your affiliation with a person or
                entity, conducting fraud, hiding or attempting to hide your
                identity; (J) interfering with the proper working of the Site or
                the Services; (K) accessing any content on the Site or the
                Services through any technology or means other than those
                provided or authorized by the Site or the Services; (L)
                bypassing the measures we may use to prevent or restrict access
                to the Site or the Services, including without limitation
                features that prevent or restrict use or copying of any content
                or enforce limitations on use of the Site or the content
                therein; (M) using the Site or the Services for any purpose
                prohibited or regulated by Applicable Laws; (N) using the Site
                or the Services to mint, issue, collect, upload, transmit,
                display, or distribute any content or tokens: (1) that violates
                any third-party right, including any copyright, trademark,
                patent, trade secret, moral right, privacy right, right of
                publicity, or any other intellectual property or proprietary
                right; (2) that is unlawful, harassing, abusive, tortious,
                threatening, harmful, invasive of another’s privacy, vulgar,
                defamatory, false, intentionally misleading, trade libelous,
                pornographic, obscene, patently offensive, promotes racism,
                bigotry, hatred, or physical harm of any kind against any group
                or individual or is otherwise objectionable; or (3) that is
                harmful to minors in any way; (O) engage in improper or abusive
                trading practices, including (1) any fraudulent act or scheme to
                defraud, deceive, trick or mislead; (2) trading ahead of another
                user of the Services or front-running; (3) fraudulent trading;
                (4) accommodation trading; (5) fictitious transactions; (6)
                pre-arranged or non-competitive transactions; (7) violations of
                bids or offers; (8) spoofing; (9) manipulation; (10) knowingly
                making any bid or offer for the purpose of making a market price
                that does not reflect the true state of the market; or (11)
                entering orders for the purpose of entering into transactions
                without a net change in either party’s open positions but a
                resulting profit to one party and a loss to the other party,
                commonly known as a “money pass”; (P) use or access the Site or
                the Services to transmit or exchange Digital Assets that are the
                direct or indirect proceeds of any criminal or fraudulent
                activity, including terrorism or tax evasion; or (Q) using the
                Site or the Platform for any purposes other than using our
                Services. (ii) We may, without prior notice, change the Site or
                the Services; stop providing the Site or the Services or
                features of the Site or the Services to you or to users
                generally; or create usage limits for the Site or the Services.
                We may permanently or temporarily terminate or suspend your
                access to the Site or the Services without notice and liability
                for any reason, including if in our sole determination you
                violate any provision of this Agreement, or for no reason. Upon
                termination for any reason or no reason, you continue to be
                bound by this Agreement. You agree that we will not be liable to
                you or to any third party for any modification, suspension, or
                discontinuation of the Site or the Services or any part thereof.
                (iii) You are solely responsible for your interactions with
                other users of the Site and the Services. We reserve the right,
                but have no obligation, to monitor disputes between you and
                other users. We shall have no liability for your interactions
                with other users, or for any user’s action or inaction. (e)
                Restrictions on Use (i) We make no representations that the Site
                or the Services are appropriate or available for use in any
                location. Those who access or use the Site or the Services do so
                at their own volition and are entirely responsible for
                compliance with all Applicable Laws, including but not limited
                to export and import regulations. (ii) You may not use the Site
                or the Services if you are a person or entity resident in, a
                citizen of, located in, incorporated, formed or organized in or
                have a registered office in Iran, Cuba, North Korea, Syria,
                Myanmar (Burma), the regions of Crimea, Donetsk or Luhansk or
                any other country, region, territory or jurisdiction which has
                been sanctioned or embargoed by the United States, the United
                Kingdom or the European Union, the United Nations, North
                Atlantic Treaty Organisation, Organisation for Economic
                Cooperation and Development, Financial Action Task Force, or any
                other applicable Governmental Authority (any such country,
                region, territory or jurisdiction being a “Restricted Territory”
                and any such person or entity resident in, a citizen of, located
                in, incorporated, formed or organized in or having a registered
                office in such Restricted Territory being a “Restricted
                Person”). (iii) You may not use the Site or the Services if you
                are a person or entity subject to sanctions administered or
                enforced by any applicable Governmental Authority or otherwise
                designated on any list of prohibited or restricted parties by
                any applicable Governmental Authority, including without
                limitation the Office of Foreign Assets Control of the United
                States Department of the Treasury (a “Sanctioned Person”). (iv)
                You may not use the Site or the Services if you are a person or
                entity resident in, a citizen of, located in, incorporated,
                formed or organized in or have a registered office in the United
                States (a “Blocked Person”).
              </p>
              <p>
                3. Our Proprietary Rights (i) The Site, the Platform and the
                Services and all materials therein or transferred thereby,
                including, without limitation, software, images, text, graphics,
                illustrations, logos, patents, trademarks, service marks,
                copyrights, photographs, audio, videos and music and all
                intellectual property rights related thereto (the “Company
                Content”) but excluding all material, content or information
                posted or upload by you or other users to the Site, the Platform
                or the Services (“User Content”), are the exclusive property of
                us and our licensors. Except as explicitly provided herein,
                nothing in this Agreement shall be deemed to create a license in
                or under any such Company Content or intellectual property
                rights, and you agree not to sell, license, rent, modify,
                distribute, copy, reproduce, transmit, publicly display,
                publicly perform, publish, adapt, edit or create derivative
                works from any Company Content. Use of the Company Content for
                any purpose not expressly permitted by this Agreement is
                strictly prohibited. Company Content is made available solely
                for your personal, non-commercial use and may not be copied,
                reproduced, published, republished, modified, mirrored,
                uploaded, posted, transmitted, displayed, encoded, translated or
                distributed in any form or in way, including by e-mail or other
                electronic means, or stored in any retrieval system of any
                nature in any way, without the express prior written consent of
                us or such third party that may own such Company Content in each
                instance. You agree to abide by all copyright and other
                proprietary notices, information and restrictions contained in
                the Company Content and any other material accessed through the
                Site. (ii) You may choose to, or we may invite you to submit
                comments, feedback, or ideas about the Site and the Services,
                including without limitation about how to improve the Site or
                our Services (“Feedback”). By submitting any Feedback, you agree
                that (A) your disclosure is non-confidential, gratuitous,
                unsolicited and without restriction and will not place us under
                any fiduciary or other obligation, (B) you grant to us a
                perpetual, worldwide, royalty-free, irrevocable, transferable,
                sublicensable, non-exclusive and fully paid-up right to copy,
                use, reproduce, modify, adapt, publish, create derivative works
                from, translate, transmit, display, distribute, market, promote,
                sell or offer for sale, rent or lease such information or
                materials or any portions thereof (including any ideas for new
                products or Services or modifications to existing products or
                Services) and/or products or Services which practice or embody,
                or are configured for use in practicing, such information or
                materials or any portion thereof, in any form or medium known or
                later developed, in furtherance of the terms of the Agreement
                and the actions and transactions contemplated hereby, including
                the right to bring an action for infringement of these rights,
                (C) we are free to use the Feedback without any additional
                compensation to you, and/or to disclose the Feedback on a
                non-confidential basis or otherwise to anyone and (D) you will
                have no claim against for any actual or alleged infringement of
                any proprietary rights, rights of privacy or publicity, moral
                rights or rights of attribution in connection with our use of
                any Feedback you provide. You further acknowledge that, by
                acceptance of your submission, we do not waive any rights to use
                similar or related comments, feedback and ideas previously known
                to us, or developed by our employees, or obtained from sources
                other than you.
              </p>
              <p>
                4. Fees and Price Estimates In connection with your use of the
                Services you are required to pay all fees necessary for
                interacting with the applicable blockchain, including “gas”
                costs, as well as all other fees reflected on the Site or the
                Platform at the time of your use of the Services. Although we
                attempt to provide accurate fee information, this information
                reflects an estimate of fees, which may vary from the actual
                fees paid to use the Services and interact with the applicable
                blockchain.
              </p>
              <p>
                5. No Professional Advice All information on the Site and the
                Services is for informational purposes only and should not be
                construed as professional advice. You should contact your own
                legal, financial, tax or other professional advisors. Neither
                the Site, the Services nor we provide any legal, financial,
                taxation or any other professional advice. No action should be
                taken based upon any information contained in the Site or the
                Services. You should seek independent professional advice from a
                person who is licensed and/or qualified in the applicable area.
              </p>
              <p>
                6. Privacy We care about the privacy of our users. You
                understand that by using the Site you consent to the collection,
                use and disclosure of personally identifiable information and
                aggregate data, and to have your personally identifiable
                information collected, used, transferred to and processed in
                accordance with our Privacy Policy. Our Privacy Policy is hereby
                incorporated into and forms part of this Agreement.
              </p>
              <p>
                7. Cautionary Note on Forward-looking Statements All statements
                contained in the Company Content, the Services, the Site,
                statements made in press releases or in any place accessible by
                the public and oral statements that may be made by the Company
                Parties (as defined below) may constitute forward-looking
                statements (including statements regarding the intent, belief or
                current expectations with respect to market conditions, business
                strategy and plans, financial condition, specific provisions and
                risk management practices). You are cautioned not to place undue
                reliance on these forward-looking statements given that these
                statements involve known and unknown risks, uncertainties and
                other factors that may cause the actual future results to be
                materially different from that described by such forward-looking
                statements, and no independent third party has reviewed the
                reasonableness of any such statements or assumptions. These
                forward-looking statements are applicable only as of the date
                indicated therein and the Company Parties disclaim any
                responsibility (whether express or implied) to release any
                revisions to these forward-looking statements to reflect events
                after such date.
              </p>
              <p>
                8. Security (a) We are an early stage platform. You acknowledge
                that applications are code that are subject to flaws and
                acknowledge that you are solely responsible for evaluating any
                available code provided by the Services. You further expressly
                acknowledge and represent that applications can be written
                maliciously or negligently, and that we cannot be held liable
                for your interaction with such applications. These warnings and
                others later provided by us in no way evidence or represent an
                ongoing duty to alert you to all the potential risks of
                utilizing the Site and Services. (b) We use commercially
                reasonable physical, managerial, and technical safeguards to
                preserve the integrity and security of your personal information
                and implement your privacy settings. However, we cannot
                guarantee that unauthorized third parties will never be able to
                defeat our security measures or use your personal information
                for improper purposes. You acknowledge that you provide your
                personal information at your own risk.
              </p>
              <p>
                9. Third-Party Links and Information The Site or the Services
                may contain links to third-party materials that are not owned or
                controlled by us. we do not endorse or assume any responsibility
                for any such third-party websites, information, materials,
                products, or services. If you access a third-party website or
                service from the Site or the Services on or through any
                third-party website or service, you do so at your own risk, and
                you understand that this Agreement and our Privacy Policy do not
                apply to your use of such websites. You expressly relieve us
                from any and all liability arising from your use of any
                third-party website, service, or content. Additionally, your
                dealings with or participation in promotions of advertisers
                found on the Site or the Services, including payment and
                delivery of goods, and any other terms (such as warranties) are
                solely between you and such advertisers. You agree that we shall
                not be responsible for any loss or damage of any sort relating
                to your dealings with such advertisers.
              </p>
              <p>
                10. Indemnity You agree to defend, indemnify and hold harmless
                us, our affiliates, and each of our and their respective
                shareholders, members, directors, officers, managers, employees,
                lawyers, agents, accountants, advisors, representatives,
                suppliers, licensors, dealers and contractors (collectively, the
                “Company Parties”), from and against any and all claims,
                damages, obligations, losses, liabilities, costs or debt, and
                expenses (including but not limited to lawyer’s fees and
                disbursements) arising from: (a) your use of and access to the
                Site, the Platform, Company Content and the Services, including
                without limitation minting, selling and transferring Digital
                Assets and any act or omission by you or users of your account
                or any data or content transmitted or received by you; (b) your
                violation of any term of this Agreement, including without
                limitation your breach of any of the representations and
                warranties above; (c) your violation of any third-party right,
                including without limitation any right of privacy or
                intellectual property rights; (d) your violation of any
                Applicable Laws; (e) any User Content that you submit to the
                Site or the Services including without limitation misleading,
                false, or inaccurate information; (f) your willful misconduct;
                or (g) any other party’s access and use of the Site, the
                Platform, Company Content or the Services with your unique
                username, password or other appropriate security code. You will
                co-operate as fully as reasonably required in the defense of any
                claim.
              </p>
              <p>
                11. No Warranty (a) The Site and the Services are provided on an
                “as is” and “as available” basis. Use of the Site, the Platform,
                Company Content and the Services is at your own risk. To the
                maximum extent permitted by applicable law, the Site, the
                Platform, Company Content and the Services are provided without
                warranties of any kind, whether express or implied, including,
                but not limited to, implied warranties of merchantability,
                fitness for a particular purpose, or non-infringement. No advice
                or information, whether oral or written, obtained by you from a
                Company Party or through the Site or the Services will create
                any warranty not expressly stated herein. Without limiting the
                foregoing, the Company Parties do not warrant that the Company
                Content is accurate, reliable or correct; that the Site, the
                Platform, Company Content and the Services will meet your
                requirements; that the Site, the Platform, Company Content and
                the Services will be available at any particular time or
                location, uninterrupted or secure; that any defects or errors
                will be corrected; or that the Site, the Platform, Company
                Content and the Services are free of viruses or other harmful
                components. Any content downloaded or otherwise obtained through
                the use of the Site or the Services is downloaded at your own
                risk and you will be solely responsible for any damage to your
                computer system or mobile device or loss of data that results
                from such download or your use of the Site, the Platform,
                Company Content or the Services. (b) You acknowledge and agree
                that: (i) we are a developer of software; (ii) we do not operate
                a Digital Asset or derivatives exchange platform or offer trade
                execution or clearing services and have no oversight,
                involvement, or control concerning your transactions using the
                Services; and (iii) all transactions between users are executed
                peer-to-peer directly between the users’ digital wallet
                addresses through a smart contract. (c) You understand and agree
                that we are not registered or licensed by any regulatory agency
                or authority. No such agency or authority has reviewed or
                approved the use of the Site, the Platform or the Services. (d)
                We do not warrant, endorse, guarantee, or assume responsibility
                for any product or websites advertised or offered by a third
                party through the Site or the Services or any hyperlinked
                websites, and we will not be a party to or in any way monitor
                any transaction between you and third-party providers of
                products or services.
              </p>
              <p>
                12. Disclaimers None of the Company Parties will have any
                responsibilities or liability with respect to the following: (a)
                the Services could be impacted by one or more regulatory
                inquiries or actions, which could prevent or limit our ability
                to continue to develop or provide the Services, or for you and
                your users to use the Services, (b) we have no obligation to
                update the Services or its underlying platforms and networks to
                address, mitigate, or remediate any security or other
                vulnerabilities in the Services, or such platforms or networks
                and (c) portions of the Services or any other underlying
                networks and platforms may rest on open-source software, and
                there is a risk that weaknesses or bugs that may be introduced
                in the infrastructural elements of the Services or any other
                underlying networks and platforms, which may result in security
                vulnerabilities, data loss, damage, destructions, disclosure, or
                other compromises.
              </p>
              <p>
                13. Assumption of Risk You acknowledge that the Site and the
                Services, and your use of the Site and the Services contain
                certain risks, including without limitation the risks below, and
                accordingly, you expressly agree that you assume all risk in
                connection with your access and use of the Site and Services:
                (a) by utilizing the Services or interacting with the Site or
                the Platform in any way, you understand and agree to the
                inherent risks associated with: (i) cryptographic systems and
                blockchain-based networks; (ii) Digital Assets, including
                without limitation the usage and intricacies of native Digital
                Assets; (iii) smart contract-based Digital Assets, including
                fungible and non-fungible tokens; and (iv) systems that interact
                with blockchain-based networks. We do not own or control any of
                the underlying software through which blockchain networks are
                formed. In general, the software underlying blockchain networks,
                including the Aptos blockchain, is open source, such that anyone
                can use, copy, modify, and distribute it. By using the Services,
                you acknowledge and agree that (A) we are not responsible for
                the operation of the blockchain-based software and networks
                underlying the Services, (B) there exists no guarantee of the
                functionality, security, or availability of that software and
                networks, and (C) the underlying blockchain-based networks are
                subject to sudden changes in operating rules, such as those
                commonly referred to as “forks,” which may materially affect the
                Services; (b) blockchain networks use public and private key
                cryptography. You alone are responsible for securing your
                private key(s). We do not have access to your private key(s).
                Losing control of your private key(s) will permanently and
                irreversibly deny you access to Digital Assets on the Aptos
                blockchain or other blockchain-based network. Neither we nor any
                other person or entity will be able to retrieve or protect your
                Digital Assets. If your private key(s) are lost, then you will
                not be able to transfer your Digital Assets to any other
                blockchain address or wallet. If this occurs, then you will not
                be able to realize any value or utility from the Digital Assets
                that you may hold; (c) the Services and your Digital Assets
                could be impacted by one or more regulatory inquiries or
                regulatory actions, which could impede or limit our ability to
                continue to make available our proprietary software and could
                impede or limit your ability to access or use the Services; (d)
                cryptography is a progressing field. Advances in code cracking
                or technical advances such as the development of quantum
                computers may present risks to cryptographic systems and the
                Services, which could result in the theft or loss of your
                assets. To the extent possible, we intend to update or propose
                updates to the code underlying the Services to account for any
                advances in cryptography and to incorporate additional security
                measures but does not guarantee or otherwise represent full
                security of the system. By using the Services, you acknowledge
                these inherent risks; (e) the Berachain blockchain and any other
                applicable blockchain remains under development, which creates
                technological and security risks when using the Services in
                addition to uncertainty relating to Digital Assets and
                transactions therein. You acknowledge that the cost of
                transacting on an applicable blockchain is variable and may
                increase at any time causing impact to any activities taking
                place on such blockchain, which may result in price fluctuations
                or increased costs when using the Services; (f) the Services are
                subject to flaws and that you are solely responsible for
                evaluating any code provided by the Services, the Site or the
                Platform. This warning and other warnings that we provide in
                this Agreement are in no way evidence or represent an on-going
                duty to alert you to all of the potential risks of utilizing the
                Services or accessing the Site or the Platform; (g) although we
                intend to provide accurate and timely information and data on
                the Site and the Platform during your use of the Services, the
                Site, the Platform and other information available when using
                the Services may not always be entirely accurate, complete, or
                current and may also include technical inaccuracies or
                typographical errors. To continue to provide you with as
                complete and accurate information as possible, information may
                be changed or updated from time to time without notice,
                including information regarding our policies. Accordingly, you
                should verify all information before relying on it, and all
                decisions based on information contained on the Site, the
                Platform or as part of the Services are your sole
                responsibility. No representation is made as to the accuracy,
                completeness, or appropriateness for any particular purpose of
                any pricing information distributed via the Site or the Platform
                or otherwise when using the Services. Prices and pricing
                information may be higher or lower than prices available on
                platforms providing similar services; (h) any use or interaction
                with the Services requires a comprehensive understanding of
                applied cryptography and computer science to appreciate the
                inherent risks, including those listed above. You represent and
                warrant that you possess relevant knowledge and skills. Any
                reference to a type of Digital Asset on the Site, the Platform
                or otherwise during the use of the Services does not indicate
                our approval or disapproval of the technology on which the
                Digital Asset relies, and should not be used as a substitute for
                your understanding of the risks specific to each type of Digital
                Asset; (i) use of the Services, in particular for trading
                Digital Assets, may carry financial risk. Digital Assets are, by
                their nature, highly experimental, risky, and volatile.
                Transactions entered into in connection with the Services are
                irreversible, final and there are no refunds. You acknowledge
                and agree that you will access and use the Site, the Platform
                and the Services at your own risk. The risk of loss in trading
                or transferring Digital Assets can be substantial. You should,
                therefore, carefully consider whether such trading or transfer
                is suitable for you in light of your circumstances and financial
                resources. By using the Services, you represent and warrant that
                you have been, are, and will be solely responsible for making
                your independent appraisal and investigations into the risks of
                a given transaction and the underlying Digital Assets. You
                represent that you have sufficient knowledge, market
                sophistication, professional advice, and experience to make your
                evaluation of the merits and risks of any transaction conducted
                in connection with the Services or any Digital Asset. You accept
                all consequences of using the Services, including the risk that
                you may lose access to your Digital Assets indefinitely. All
                transaction decisions are made solely by you. Notwithstanding
                anything in these Terms, we accept no responsibility whatsoever
                for, and will in no circumstances be liable to you in connection
                with, your use of the Services for performing Digital Asset
                transactions; (j) we must comply with Applicable Laws, which may
                require us to, upon request by government agencies, take certain
                actions or provide information, which may not be in your best
                interests; (k) you are responsible for all trades you place,
                including any erroneous orders that may be filled. We do not
                take any action to resolve erroneous trades that result from
                your errors; (l) any Services you interact with are entirely
                your own responsibility and liability, and we are not a party to
                the Protocol; (m) at any time, your access to your Digital
                Assets may be suspended or terminated or there may be a delay in
                your access or use of your Digital Assets which may result in
                the Digital Assets diminishing in value; (n) the Services may be
                suspended or terminated for any or no reason, which may limit
                your access to your Digital Assets; and (o) we will have no
                responsibility or liability for the risks set forth in this
                Section 13. You hereby irrevocably waive, release and discharge
                all claims, whether known or unknown to you, against the Company
                Parties related to any of the risks set forth in this Section
                13.
              </p>
              <p>
                14. Limitation of Liability (a) You agree that to the maximum
                extent permitted by Applicable Laws, in no event shall any
                Company Party be liable for any indirect, punitive, incidental,
                special, consequential or exemplary damages, including without
                limitation damages for loss of profits, goodwill, use, data or
                other intangible losses, arising out of or relating to the use
                of, or inability to use, the Site, the Platform, Company Content
                or the Services. Under no circumstances will any Company Party
                be responsible for any damage, loss or injury resulting from
                hacking, tampering or other unauthorized access or use of the
                Site, the Platform, the Services or the Company Content and
                other information contained therein. To the maximum extent
                permitted by Applicable Laws, we assume no liability or
                responsibility for any (i) errors, mistakes, or inaccuracies of
                content; (ii) personal injury or property damage, of any nature
                whatsoever, resulting from your access to or use of our Site,
                the Platform, Company Content or the Services; (iii) any
                unauthorized access to or use of our secure servers and/or any
                and all personal information stored therein; (iv) any
                interruption or cessation of transmission to or from the Site,
                the Platform or the Services; (v) any bugs, viruses, trojan
                horses, or the like that may be transmitted to or through our
                Site, the Platform, Company Content or the Services by any third
                party; (vi) any errors or omissions in any content or for any
                loss or damage incurred as a result of the use of any content
                posted, emailed, transmitted, or otherwise made available
                through the Site, the Platform or the Services; and/or (vii)
                User Content or the defamatory, offensive, or illegal conduct of
                any third party. You agree that if, notwithstanding the other
                provisions of this Agreement, a Company Party is found to be
                liable for any claims, proceedings, liabilities, obligations,
                damages, losses or costs, such Company Party’s liability shall
                in no event exceed the greater of (A) US$100 and (B) the amount
                you paid to us hereunder during the one-month period prior to
                the date on which such claim arose, if any. (b) This limitation
                of liability section applies whether the alleged liability is
                based on contract, tort, negligence, strict liability, or any
                other basis, even if we have been advised of the possibility of
                such damage. The foregoing limitation of liability shall apply
                to the fullest extent permitted by Applicable Laws.
              </p>
              <p>
                15. Limitations as Allowed by Law Some states, provinces and
                other jurisdictions do not allow the exclusion and limitations
                of certain implied warranties, or the exclusion or limitation of
                incidental or consequential damages, so the above limitations or
                exclusions may not apply to you. This Agreement gives you
                specific legal rights, and you may also have other rights which
                vary from jurisdiction to jurisdiction. The disclaimers,
                exclusions, and limitations of liability under this agreement
                will not apply to the extent prohibited by Applicable Laws.
              </p>
              <p>
                16. Force Majeure We will have no responsibility or liability
                for any failure or delay in performance of the Site, the
                Platform or any of the Services, or any loss or damage that you
                may incur, due to any circumstance or event beyond our control,
                including any (a) flood, extraordinary weather conditions,
                earthquake, or other act of God, (b) fire, (c) war, (d)
                insurrection, (e) riot, (f) labour dispute, (g) accident, (h)
                epidemic or pandemic, (i) action of government, (j) new laws or
                regulations or change in existing laws or regulations or the
                interpretation or enforcement of any of the foregoing, (k)
                communications, (l) power failure, (m) equipment or software
                unavailability, disruption or malfunction, (n) hacking or other
                attack on the Site, the Platform or the Services, (o) the
                unavailability, disruption or malfunction of any network or
                blockchains or (p) the unavailability, disruption or malfunction
                of the Internet.
              </p>
              <p>
                17. Non-Waiver Our failure or delay in insisting upon or
                enforcing strict performance of any provision of this Agreement
                shall not be construed as a waiver of any provision or rights.
                No waiver of any provision of this Agreement shall constitute a
                waiver of any other provision, nor shall any waiver of any
                provision of this Agreement constitute a continuing waiver
                unless expressly made in writing by us.
              </p>
              <p>
                18. Severability In the event that any of the provisions of this
                Agreement are held by a court or other tribunal of competent
                jurisdiction to be unenforceable, such provisions shall be
                limited or eliminated to the minimum extent necessary so that
                these terms and conditions shall otherwise remain in full force
                and effect.
              </p>
              <p>
                19. Governing Law and Jurisdiction This Agreement is entered
                into in Panama and shall be governed by, and construed in
                accordance with, the laws of Panama. You agree to submit to the
                exclusive jurisdiction of the courts of Panama or any other
                judicial district or jurisdiction as we may determine in any and
                all actions, disputes or controversies relating hereto. You
                further agree as follows: (a) any claim brought to enforce these
                terms and conditions must be commenced within 6 months of the
                cause of action accruing; (b) no recovery may be sought or
                received for damages other than out-of-pocket expenses, except
                that the prevailing party will be entitled to costs and legal
                fees; and (c) any claim must be brought individually and not
                consolidated as part of a group or class action complaint.
              </p>
              <p>
                20. Amendments We reserve the right, in our sole discretion, to
                modify the terms of this Agreement from time to time. If we make
                changes, we will provide you with notice of such changes, such
                as by providing notice through the Site, the Services or
                updating the “Last Updated” date at the top of this Agreement.
                Unless we state otherwise in our notice, all such modifications
                are effective immediately, and your continued use of the Site
                and the Services after we provide that notice will confirm your
                acceptance of the changes. If you do not agree to the amended
                terms of this Agreement, then your only recourse is to terminate
                this Agreement by providing written notice to us and must stop
                using the Site and the Services.
              </p>
              <p>
                21. Language This Agreement, including all other documents
                incorporated by reference herein, are binding and constitute the
                entire agreement between us and you with respect to your use of
                the Site and the Services. The parties agree that the English
                language will be the language of the Agreement and all documents
                in connection thereto, and each party waives any right (whether
                statutory or otherwise) to use and rely upon any other language,
                or translations. Il est de la volonté expresse des parties que
                tous les documents qui s&apos;y rattachent soient rédigés en
                langue anglaise.
              </p>
              <p
                className="cursor-pointer text-[7.5vw] font-bold hover:scale-[120%] lg:text-[5vw]"
                onClick={() => {
                  setGeo("TRUE");
                }}
              >
                please click here to sign
              </p>
            </div>
            <button
              onClick={scrollToBottom}
              className="fixed right-8 bottom-4 md:bottom-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-[#EEDCD2] shadow-lg transition-colors duration-200 hover:bg-[#D9C6BA]"
              aria-label="Scroll to bottom"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
