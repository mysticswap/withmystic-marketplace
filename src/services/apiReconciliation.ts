import { offerTokens } from "../constants";
import { Nft, NftContractNftsResponse } from "../types/market-schemas.types";
import { Activity } from "../types/rsv-types/collection-activity.types";
import { convertToIPFSImage } from "../utils";

export function ApiToReservoirApi(nftData: NftContractNftsResponse) {
  const nfts = nftData.nfts.map((data: Nft) => {
    return {
      market: {
        id: data.contract.address,
        price: {
          currency: {
            contract: "0x0000000000000000000000000000000000000000",
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
          amount: {
            raw: "4000000000000000",
            decimal: 0.004,
            usd: 11.77489,
            native: 0.004,
          },
        },
        //"maker": "0xa5e809ebf9c9906f8ac12af273fb736fce5c39c9",
      },
      token: {
        attributes:
          data.rawMetadata?.attributes?.map((key) => {
            return {
              key: key.trait_type,
              kind: "string",
              value: key.value,
              tokenCount: key.count || 0,
            };
          }) || [],
        chainId: 1,
        contract: data.contract.address,
        tokenId: data.tokenId,
        name: data.title,
        description: data.description,
        image: convertToIPFSImage(data.media[0]?.raw), //
        imageSmall: convertToIPFSImage(data.media[0]?.thumbnail),
        imageLarge: null,
        media: null,
        kind: data.contract.tokenType,
        isFlagged: false,
        isSpam: false,
        isNsfw: false,
        metadataDisabled: false,
        lastFlagUpdate: "2024-02-13T00:44:28.127Z",
        lastFlagChange: null,
        supply: "1",
        remainingSupply: "1",
        rarity: 100,
        rarityRank: 1,
      },
    };
  });

  return { tokens: nfts };
}

export function SingleNFTApiToReservoirApi(
  nftData: Nft,
  owner: string,
  lastAsk: any
) {
  const data = nftData;
  const nfts = [
    {
      market: {
        floorAsk: {
          id: lastAsk?.contract,
          price: lastAsk?.price,
          maker: lastAsk?.fromAddress,
          validFrom: lastAsk?.timestamp,
          validUntil: lastAsk?.timestamp + 86400,
          source: {
            id: "",
            domain: "marketplace.mysticswap.io",
            name: "marketplace.mysticswap.io",
          },
        },
      },
      token: {
        chainId: 1,
        contract: data.contract.address,
        tokenId: data.tokenId,
        name: data.title,
        description: data.description,
        image: convertToIPFSImage(data.media[0]?.raw), //
        imageSmall: convertToIPFSImage(data.media[0]?.thumbnail),
        imageLarge: null,
        media: null,
        kind: data.contract.tokenType,
        isFlagged: false,
        isSpam: false,
        isNsfw: false,
        metadataDisabled: false,
        lastFlagUpdate: "2024-02-13T00:44:28.127Z",
        lastFlagChange: null,
        supply: "1",
        remainingSupply: "1",
        rarity: null,
        rarityRank: null,
        owner,
        collection: {
          tokenCount: data.contract.totalSupply,
          name: data.title,
          description: data.description,
        },
        attributes:
          data.rawMetadata?.attributes?.map((key) => {
            return {
              key: key.trait_type,
              kind: "string",
              value: key.value,
              tokenCount: key.count || 0,
            };
          }) || [],
      },
    },
  ];

  return { tokens: nfts };
}

export function TraitApiToReservoirApi(traits: any) {
  const traitKeys = Object.keys(traits.traits);
  const nfts = traitKeys.map((key: any) => {
    const mainTraits = Object.keys(traits.traits[key]);
    return {
      key,
      kind: "string",
      attributeCount: mainTraits.length,
      values: mainTraits.map((ts) => ({
        count: traits.traits[key][ts],
        value: ts,
      })),
    };
  });

  return { attributes: nfts };
}

export function SingleNFTTraitApiToReservoirApi(traits: any) {
  const newTraits = traits.map((key: any) => {
    return {
      key: key.trait_type,
      kind: "string",
      value: key.value,
    };
  });

  return newTraits;
}

export function UserNFTToReservoirAPI(nfts: any, chainId: number) {
  const newTokens =
    nfts?.ownedNfts?.map((nft: any) => {
      return {
        ownership: {
          tokenCount: "1",
          onSaleCount: "0",
          floorAsk: {
            id: null,
            price: null,
            maker: null,
            kind: null,
            validFrom: null,
            validUntil: null,
            source: null,
          },
        },
        token: {
          chainId,
          contract: nft.contract.address,
          tokenId: nft.tokenId,
          kind: nft.tokenType,
          name: nft.title,
          image: nft.media[0].thumbnail,
          imageSmall: nft.media[0].thumbnail,
          imageLarge: convertToIPFSImage(nft.media[0].raw),
          metadata: {
            imageOriginal: nft.media[0].raw,
            imageMimeType: "image/jpeg",
            tokenURI: nft.tokenUri.gateway,
          },
          description: nft.contract.description,
          supply: nft.balance,
          remainingSupply: nft.balance,
          media: null,
          isFlagged: false,
          isSpam: false,
          metadataDisabled: false,
          lastFlagUpdate: null,
          lastFlagChange: null,
          collection: {
            id: nft.contract.address,
            name: nft.contract.name,
            slug: nft.contract.name,
            symbol: nft.contract.symbol,
            imageUrl: convertToIPFSImage(nft.media[0].raw),
            isSpam: false,
            metadataDisabled: false,
            openseaVerificationStatus: "not_requested",

            royaltiesBps: 0,
            royalties: [],
          },
          lastAppraisalValue: null,
        },
      };
    }) || [];

  return { tokens: newTokens };
}

export function ActivityApiToReservoirApi(activityData: any, types: string) {
  const nfts = activityData.nftSales
    .map((data: any) => {
      return {
        type: "sale",
        swapId: data._id,
        fromAddress: data.buyerAddress,
        toAddress: data.sellerAddress,
        price: {
          currency: {
            contract: data.sellerFee.tokenAddress,
            name: data.sellerFee.symbol,
            symbol: data.sellerFee.symbol || "ETH",
            decimals: data.sellerFee.decimal,
          },
          amount: {
            raw: +(data.sellerFee.amount / 10 ** 18).toFixed(5),
            decimal: +(data.sellerFee.amount / 10 ** 18).toFixed(5),
            usd: 264.15361,
            native: +(data.sellerFee.amount / 10 ** 18).toFixed(5),
          },
        },
        amount: 1,
        timestamp: data.timestamp,
        contract: data.contractAddress,
        token: {
          tokenId: data.tokenMetadata.tokenId,
          isSpam: false,
          isNsfw: false,
          tokenName: data.tokenMetadata.title,
          tokenImage: convertToIPFSImage(data.tokenMetadata.rawMetadata.image),
          // rarityScore: 195.341,
          // rarityRank: 25,
        },
        collection: {
          collectionId: data.contractAddress,
          isSpam: false,
          isNsfw: false,
          collectionName: data.tokenMetadata.contract.name,
          collectionImage: data.tokenMetadata.contract.openSea.imageUrl,
        },
      };
    })
    .filter((i: any) => JSON.parse(types).includes(i.type)) as Activity[];

  return { activities: nfts };
}

export function OffersApiToReservoirApi(offerData: any, chainId = 1) {
  const nfts = offerData.map((data: any) => {
    const tk = offerTokens[chainId].find(
      (k) =>
        k.contract.toLowerCase() ==
        data.orderComponents.offer.slice(-1)[0].token.toLowerCase()
    );

    return {
      id: data._id,
      swapId: data._id,
      kind: data.metadata.nftsMetadata[0].tokenType,
      // side: string;
      status: data.status,
      tokenSetId: data.metadata.nftsMetadata[0].tokenId,
      contract: data.metadata.nftsMetadata[0].contract.address,
      contractKind: data.metadata.nftsMetadata[0].tokenType,
      maker: data.creatorAddress,
      taker: data.takerAddress,
      price: {
        currency: {
          contract: tk?.contract || "",
          name: tk?.name || "WETH",
          symbol: tk?.symbol || "WETH",
          decimals: tk?.decimals || 18,
        },
        amount: {
          raw: +(+data.orderComponents.offer.slice(-1)[0].endAmount).toFixed(5),
          decimal: +(
            +data.orderComponents.offer.slice(-1)[0].endAmount /
            10 ** (tk?.decimals || 18)
          ).toFixed(5),
          usd: 264.15361,
          native: +(
            +data.orderComponents.offer.slice(-1)[0].endAmount /
            10 ** (tk?.decimals || 18)
          ).toFixed(5),
        },
      },
      validFrom: data.orderComponents.startTime,
      validUntil: data.orderComponents.endTime,
      quantityFilled: "1",
      // quantityRemaining: number;
      // criteria: Criteria;
      source: {
        id: data.clientId,
        domain: "",
        name: "MysticSwap",
        icon: "",
        url: "",
      },
      // feeBps: number;
      // feeBreakdown: FeeBreakdown[];
      // expiration: number;
      // isReservoir: null;
      // createdAt: Date;
      // updatedAt: Date;
      // originatedAt: Date;
    };
  });

  return { orders: nfts };
}

export function SwapApiToReservoirApi(swapData: any) {
  const nfts = swapData.map((data: any) => {
    return {
      type: data.type == "listing" ? "ask" : data.type,
      fromAddress: data.creatorAddress,
      toAddress: data.takerAddress,
      price: {
        currency: {
          contract: "",
          name: "WETH",
          symbol: "WETH",
          decimals: 18,
        },
        amount: {
          raw:
            +(+data.orderComponents.consideration.slice(-1)[0]
              .endAmount).toFixed(5) ||
            +(+data.orderComponents.offer.slice(-1)[0].endAmount).toFixed(5),
          decimal:
            +(
              +data.orderComponents.consideration.slice(-1)[0].endAmount /
              10 ** 18
            ).toFixed(5) ||
            +(
              +data.orderComponents.offer.slice(-1)[0].endAmount /
              10 ** 18
            ).toFixed(5),
          usd: 2500,
          native:
            +(
              +data.orderComponents.consideration.slice(-1)[0].endAmount /
              10 ** 18
            ).toFixed(5) ||
            +(
              +data.orderComponents.offer.slice(-1)[0].endAmount /
              10 ** 18
            ).toFixed(5),
        },
      },
      amount: 1,
      timestamp: data.metadata.nftsMetadata[0].rawMetadata.date,
      contract: data.metadata.nftsMetadata[0].contract.address,
      token: {
        tokenId: data.metadata.nftsMetadata[0].tokenId,
        isSpam: false,
        isNsfw: false,
        tokenName: data.metadata.nftsMetadata[0].title,
        tokenImage: convertToIPFSImage(
          data.metadata.nftsMetadata[0].rawMetadata.image
        ),
        // rarityScore: 195.341,
        // rarityRank: 25,
      },
      collection: {
        collectionId: data.metadata.nftsMetadata[0].contract.address,
        isSpam: false,
        isNsfw: false,
        collectionName: data.metadata.nftsMetadata[0].title,
        collectionImage:
          data.metadata.nftsMetadata[0].contract.openSea.imageUrl,
      },
    };
  }) as Activity[];

  return { activities: nfts };
}

export function SingleActivityApiToReservoirApi(activityData: any) {
  const nfts = activityData.transactions.map((data: any) => {
    return {
      type: "",
      fromAddress: data.buyerAddress,
      toAddress: data.sellerAddress,
      price: {
        currency: {
          contract: data.sellerFee.tokenAddress,
          name: data.sellerFee.symbol,
          symbol: data.sellerFee.symbol || "ETH",
          decimals: data.sellerFee.decimal,
        },
        amount: {
          raw: +(data.sellerFee.amount / 10 ** 18).toFixed(5),
          decimal: +(data.sellerFee.amount / 10 ** 18).toFixed(5),
          usd: 264.15361,
          native: +(data.sellerFee.amount / 10 ** 18).toFixed(5),
        },
      },
      amount: 1,
      timestamp: data.timestamp,
      contract: data.contractAddress,
      token: {
        tokenId: data.tokenMetadata?.tokenId,
        isSpam: false,
        isNsfw: false,
        tokenName: data.tokenMetadata?.title,
        tokenImage: convertToIPFSImage(data.tokenMetadata?.rawMetadata?.image),
        // rarityScore: 195.341,
        // rarityRank: 25,
      },
      collection: {
        collectionId: data.contractAddress,
        isSpam: false,
        isNsfw: false,
        collectionName: data.tokenMetadata?.contract?.name,
        collectionImage: data.tokenMetadata?.contract?.openSea?.imageUrl,
      },
    };
  }) as Activity[];

  return { activities: nfts };
}

export function MetadataApiToReservoirApi(metadata: any, owners: number) {
  const nfts = [
    {
      ownerCount: owners,
      tokenCount: metadata.totalSupply,
      volume: {
        allTime: 0,
      },
      description: metadata?.openSea.description,
      floorAsk: {
        id: metadata.address,
        price: {
          amount: {
            raw: (metadata?.openSea?.floorPrice || 0) * 10 ** 18,
            decimal: metadata?.openSea?.floorPrice,
            native: metadata?.openSea?.floorPrice,
          },
        },
      },
    },
  ];

  return { collections: nfts };
}
