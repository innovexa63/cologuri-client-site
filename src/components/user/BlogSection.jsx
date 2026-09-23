const posts = [
  {
    id: 'sajek-guide',
    tag: 'ভ্রমণ গাইড',
    readTime: '৪ মিনিট পাঠ',
    title: 'সাজেক ভ্যালি ভ্রমণের সেরা সময় ও খরচ বাঁচানোর ৭টি কৌশল',
    excerpt: 'অফ-সিজনে কটেজের বিশেষ ছাড় এবং স্থানীয় চান্দের গাড়ি শেয়ারিংয়ের গোপন টিপস জেনে নিন অভিজ্ঞ ট্রাভেলারদের কাছ থেকে।',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq79wImyQ1sFPXd83xrCiahHdbd_LKR7qmUerK8vrVnJvrWNHu51cqbru455lXWBV9S_gND_6UsVsn8bl7Kc3a2v6pcWWPVvy59Wp-PdrvzW9MtxERQysJgqh1up_qQ0Pg2h6fZXqeQMWHVHoYuV43-BfYS0OhbPqrBdFjzorLdL6VyOCNxVbar3HlwuFU4ua6DUpLYMTkR3V_1jhtFaTTPfj0ckrHxVxwrWNpwSDntEbyunsC_Uby',
  },
  {
    id: 'sundarban-guide',
    tag: 'ইকো ট্যুরিজম',
    readTime: '৬ মিনিট পাঠ',
    title: 'সুন্দরবনে নিরাপদ ভ্রমণের পূর্ণাঙ্গ নির্দেশিকা ও পরিবেশগত করণীয়',
    excerpt: 'বন বিভাগের অনুমতি, সশস্ত্র বনরক্ষী ব্যবস্থাপনা এবং প্লাস্টিক মুক্ত ভ্রমণ সুনিশ্চিত করার খুঁটিনাটি নিয়মাবলী।',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHxWoip4hOtUiVuLVM0KL_YnK4oH6OrM6159Hxv2NZMM3FwFByAg0waEmJ0oNAamz8J4lDgwTcr20zWHMbBJ6n1n5zB1ZovJB6KAkCLsSAvsZDQz40SRjfIJJL5syeGZFcNJ7P37rEIj9-ATz6dhW731qmWwiPpuxGH8pV-NBcPlwWkJlzi0J4ISm2lzou-W-akqjjgKJ9Ld81Jf1UA-_HUB6X4HHrisWOrD766ksuvVP8AXeTnoIb',
  },
  {
    id: 'bandarban-guide',
    tag: 'ট্রেকিং টিপস',
    readTime: '৫ মিনিট পাঠ',
    title: 'বর্ষায় বান্দরবানের ঝর্ণা দর্শন: যা সাথে রাখা অপরিহার্য',
    excerpt: 'নাফাকুম ও অমিয়াখুমের পিচ্ছিল ট্রেইলে নিরাপদ গ্রিপ জুতো, জোঁক প্রতিরোধক ব্যবস্থা এবং প্রয়োজনীয় ব্যাকপ্যাকিং সামগ্রী।',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW621gMIHDB1-8gqZnhI8gbnJ6dGQUVDNR4pq6rgxUOhCd3Tw5IG3IvIqM5iS1eXG6efeBugSCI-JWaxKCiED0Dnr4bvc-Ics5ZNf5ibtLJNdJoF63H9dFzFQiYVtMpTq77XRTiOoQXZ-Ax5dE_Yz1ULxd66-tzpXXAym5AB-W2BLfx1UeW0SXj4V62IC_8Cd1g-h8j4tER8TSNbA7WzUjRD-1Mi38dCwGAF3cRpiUXIk-OiZq55Jd',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="w-full py-16 border-b border-surface-variant/30" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              ফিল্ড গাইড ও ভ্রমণ অভিজ্ঞতা
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight"
              style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}
            >
              ট্যুরে বের হওয়ার আগে যা জানা জরুরি
            </h2>
          </div>
          <a
            href="#blog"
            className="inline-flex items-center gap-1 font-semibold text-sm transition-colors group"
            style={{ color: 'var(--color-secondary)' }}
          >
            <span>সকল ভ্রমণ ব্লগ পড়ুন</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-surface-variant/40"
              style={{ backgroundColor: '#FFFFFF' }}
            >
            <div>
              <div className="h-52 w-full overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <span
                    className="px-2 py-0.5 rounded font-semibold text-xs"
                    style={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      color: 'var(--color-secondary)',
                    }}
                  >
                    {post.tag}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3
                  className="text-lg font-bold leading-snug transition-colors group-hover:text-secondary"
                  style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}
                >
                  {post.title}
                </h3>

                <p
                  className="text-sm mt-2 line-clamp-2 leading-relaxed"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div
              className="p-5 pt-0 flex items-center justify-between text-xs font-semibold"
              style={{ color: 'var(--color-secondary)' }}
            >
              <span>সম্পূর্ণ পড়ুন</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                east
              </span>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
