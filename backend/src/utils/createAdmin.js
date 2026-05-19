import User from '../models/User.js';

const createAdmin = async () => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      console.log('👷 No administrator account found. Creating standard administrator...');
      
      const adminName = process.env.ADMIN_NAME || 'Director';
      const adminEmail = process.env.ADMIN_EMAIL || 'admin56@gmail.com';
      const adminPassword = process.env.ADMIN_PASSWORD || '90905720';

      const adminUser = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // Will be auto-hashed by Mongoose pre-save hook
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=DirectorAdmin',
      });

      console.log('✅ Administrator account seeded successfully!');
      console.log(`📧 Admin Email: ${adminUser.email}`);
    } else {
      console.log('🛡️ Administrator account check: Exists.');
    }
  } catch (error) {
    console.error(`❌ Error checking/seeding admin: ${error.message}`);
  }
};

export default createAdmin;
