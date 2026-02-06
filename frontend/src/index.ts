export default {
  register() {},

  async bootstrap({ strapi }: any) {
    // Change "api::service.service" if your collection name differs
    const uid = "api::service.service";

    // Check if services already exist
    const existing = await strapi.entityService.findMany(uid, { limit: 1 });

    if (existing && existing.length > 0) return;

    const services = [
      {
        title: "Strategic Digital Post",
        description:
          "Strategic content planning and posting designed to align brand communication with business objectives.",
        videoUrl: null,
      },
      {
        title: "Content Creation",
        description:
          "High-quality visual and written content tailored to engage audiences across digital platforms.",
        videoUrl: null,
      },
      {
        title: "Copywriting",
        description:
          "Persuasive and goal-oriented copy crafted to drive engagement and conversions.",
        videoUrl: null,
      },
      {
        title: "Motion Graphic Design",
        description:
          "Animated visual content that enhances storytelling and audience retention.",
        videoUrl: null,
      },
      {
        title: "Social Media Management",
        description:
          "End-to-end management of social media platforms to build brand presence and engagement.",
        videoUrl: null,
      },
      {
        title: "Influencer and Brand Collaborations",
        description:
          "Strategic partnerships with influencers and brands to amplify reach and credibility.",
        videoUrl: null,
      },
    ];

    for (const s of services) {
      await strapi.entityService.create(uid, { data: s });
    }

    strapi.log.info("Seeded default services.");
  },
};
