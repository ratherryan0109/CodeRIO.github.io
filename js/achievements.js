var AchievementSystem = {
  ACHIEVEMENTS: [
    { id: 'first_lesson', title: 'First Steps', desc: 'Complete your first lesson', category: 'Learning', icon: 'fa-graduation-cap', ap: 25 },
    { id: 'lesson_5', title: 'Eager Learner', desc: 'Complete 5 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 50 },
    { id: 'lesson_10', title: 'Dedicated Student', desc: 'Complete 10 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 75 },
    { id: 'lesson_25', title: 'Knowledge Seeker', desc: 'Complete 25 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 125 },
    { id: 'lesson_50', title: 'Scholar', desc: 'Complete 50 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 200 },
    { id: 'lesson_100', title: 'Master Scholar', desc: 'Complete 100 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 500 },
    { id: 'first_module', title: 'Module Explorer', desc: 'Complete your first module', category: 'Learning', icon: 'fa-layer-group', ap: 30 },
    { id: 'module_10', title: 'Module Master', desc: 'Complete 10 modules', category: 'Learning', icon: 'fa-layer-group', ap: 100 },
    { id: 'module_25', title: 'Module Champion', desc: 'Complete 25 modules', category: 'Learning', icon: 'fa-layer-group', ap: 250 },
    { id: 'first_course', title: 'Course Graduate', desc: 'Complete your first course', category: 'Learning', icon: 'fa-trophy', ap: 500 },
    { id: 'course_3', title: 'Triple Threat', desc: 'Complete 3 courses', category: 'Learning', icon: 'fa-trophy', ap: 1000 },
    { id: 'course_5', title: 'Pentagram of Knowledge', desc: 'Complete 5 courses', category: 'Learning', icon: 'fa-trophy', ap: 2000 },
    { id: 'course_10', title: 'Deca-Certified', desc: 'Complete 10 courses', category: 'Learning', icon: 'fa-trophy', ap: 5000 },
    { id: 'first_quiz_pass', title: 'Quiz Rookie', desc: 'Pass your first quiz', category: 'Quizzes', icon: 'fa-check-circle', ap: 20 },
    { id: 'quiz_10', title: 'Quiz Master', desc: 'Pass 10 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 80 },
    { id: 'quiz_25', title: 'Quiz Expert', desc: 'Pass 25 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 150 },
    { id: 'quiz_50', title: 'Quiz Legend', desc: 'Pass 50 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 300 },
    { id: 'quiz_100', title: 'Quiz God', desc: 'Pass 100 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 600 },
    { id: 'quiz_perfect', title: 'Perfect Score', desc: 'Get 100% on any quiz', category: 'Quizzes', icon: 'fa-star', ap: 100 },
    { id: 'quiz_perfect_5', title: 'Perfectionist', desc: 'Get 5 perfect quiz scores', category: 'Quizzes', icon: 'fa-star', ap: 400 },
    { id: 'quiz_streak', title: 'Quiz Streak', desc: 'Pass 5 quizzes in a row', category: 'Quizzes', icon: 'fa-fire', ap: 100 },
    { id: 'first_typing', title: 'Typing Initiate', desc: 'Complete your first typing test', category: 'Typing', icon: 'fa-keyboard', ap: 15 },
    { id: 'typing_10', title: 'Typist', desc: 'Complete 10 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 50 },
    { id: 'typing_50', title: 'Speed Typer', desc: 'Complete 50 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 150 },
    { id: 'typing_100', title: 'Keyboard Warrior', desc: 'Complete 100 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 300 },
    { id: 'typing_wpm_30', title: 'Getting Started', desc: 'Reach 30 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 25 },
    { id: 'typing_wpm_50', title: 'Above Average', desc: 'Reach 50 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 50 },
    { id: 'typing_wpm_70', title: 'Fast Fingers', desc: 'Reach 70 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 100 },
    { id: 'typing_wpm_90', title: 'Speed Demon', desc: 'Reach 90 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 200 },
    { id: 'typing_wpm_110', title: 'Pro Typer', desc: 'Reach 110 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 350 },
    { id: 'typing_accuracy_95', title: 'Precision Typist', desc: 'Achieve 95% accuracy on a typing test', category: 'Typing', icon: 'fa-bullseye', ap: 50 },
    { id: 'typing_accuracy_99', title: 'Flawless', desc: 'Achieve 99% accuracy on a typing test', category: 'Typing', icon: 'fa-bullseye', ap: 150 },
    { id: 'first_project', title: 'Project Starter', desc: 'Complete your first project', category: 'Projects', icon: 'fa-code', ap: 100 },
    { id: 'project_5', title: 'Project Builder', desc: 'Complete 5 projects', category: 'Projects', icon: 'fa-code', ap: 300 },
    { id: 'project_10', title: 'Project Engineer', desc: 'Complete 10 projects', category: 'Projects', icon: 'fa-code', ap: 600 },
    { id: 'project_25', title: 'Project Architect', desc: 'Complete 25 projects', category: 'Projects', icon: 'fa-code', ap: 1500 },
    { id: 'project_milestone', title: 'Milestone Achiever', desc: 'Complete a milestone project', category: 'Projects', icon: 'fa-tower-cell', ap: 200 },
    { id: 'first_roadmap', title: 'Roadmap Adventurer', desc: 'Start your first roadmap', category: 'Roadmaps', icon: 'fa-map', ap: 20 },
    { id: 'roadmap_3', title: 'Pathfinder', desc: 'Complete 3 roadmap milestones', category: 'Roadmaps', icon: 'fa-map', ap: 60 },
    { id: 'roadmap_10', title: 'Trailblazer', desc: 'Complete 10 roadmap milestones', category: 'Roadmaps', icon: 'fa-map', ap: 200 },
    { id: 'roadmap_complete', title: 'Journey Completed', desc: 'Complete an entire roadmap', category: 'Roadmaps', icon: 'fa-map', ap: 500 },
    { id: 'streak_3', title: 'Getting Consistent', desc: 'Achieve a 3-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 30 },
    { id: 'streak_7', title: 'Week Warrior', desc: 'Achieve a 7-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 70 },
    { id: 'streak_14', title: 'Two Weeks Strong', desc: 'Achieve a 14-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 150 },
    { id: 'streak_21', title: '21 Day Habit', desc: 'Achieve a 21-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 250 },
    { id: 'streak_30', title: 'Monthly Champion', desc: 'Achieve a 30-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 400 },
    { id: 'streak_60', title: 'Two Month Hero', desc: 'Achieve a 60-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 800 },
    { id: 'streak_100', title: 'Century Streak', desc: 'Achieve a 100-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 2000 },
    { id: 'streak_365', title: 'Year of Code', desc: 'Achieve a 365-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 10000 },
    { id: 'first_practice', title: 'Practice Makes Perfect', desc: 'Complete your first practice problem', category: 'Practice', icon: 'fa-pen', ap: 15 },
    { id: 'practice_10', title: 'Problem Solver', desc: 'Solve 10 practice problems', category: 'Practice', icon: 'fa-pen', ap: 60 },
    { id: 'practice_50', title: 'Problem Hunter', desc: 'Solve 50 practice problems', category: 'Practice', icon: 'fa-pen', ap: 200 },
    { id: 'practice_100', title: 'Century Solver', desc: 'Solve 100 practice problems', category: 'Practice', icon: 'fa-pen', ap: 500 },
    { id: 'practice_500', title: 'Algorithm Master', desc: 'Solve 500 practice problems', category: 'Practice', icon: 'fa-pen', ap: 2000 },
    { id: 'first_bookmark', title: 'Bookmarker', desc: 'Bookmark your first item', category: 'Learning', icon: 'fa-bookmark', ap: 5 },
    { id: 'bookmark_10', title: 'Curator', desc: 'Bookmark 10 items', category: 'Learning', icon: 'fa-bookmark', ap: 30 },
    { id: 'bookmark_25', title: 'Librarian', desc: 'Bookmark 25 items', category: 'Learning', icon: 'fa-bookmark', ap: 75 },
    { id: 'first_note', title: 'Note Taker', desc: 'Create your first note', category: 'Learning', icon: 'fa-note-sticky', ap: 10 },
    { id: 'note_10', title: 'Journaler', desc: 'Create 10 notes', category: 'Learning', icon: 'fa-note-sticky', ap: 50 },
    { id: 'note_25', title: 'Scribe', desc: 'Create 25 notes', category: 'Learning', icon: 'fa-note-sticky', ap: 125 },
    { id: 'note_50', title: 'Author', desc: 'Create 50 notes', category: 'Learning', icon: 'fa-note-sticky', ap: 300 },
    { id: 'time_1h', title: 'First Hour', desc: 'Spend 1 hour learning', category: 'Consistency', icon: 'fa-clock', ap: 20 },
    { id: 'time_5h', title: 'Dedicated', desc: 'Spend 5 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 60 },
    { id: 'time_10h', title: 'Focused', desc: 'Spend 10 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 120 },
    { id: 'time_25h', title: 'Committed', desc: 'Spend 25 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 300 },
    { id: 'time_50h', title: 'Devoted', desc: 'Spend 50 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 600 },
    { id: 'time_100h', title: 'Century of Learning', desc: 'Spend 100 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 1500 },
    { id: 'time_500h', title: 'Learning Legend', desc: 'Spend 500 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 5000 },
    { id: 'time_1000h', title: 'The 1000 Hour Journey', desc: 'Spend 1000 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 15000 },
    { id: 'ap_100', title: 'AP Collector', desc: 'Earn 100 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_500', title: 'AP Hunter', desc: 'Earn 500 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_1000', title: 'AP Seeker', desc: 'Earn 1000 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_2500', title: 'AP Accumulator', desc: 'Earn 2500 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_5000', title: 'AP Tycoon', desc: 'Earn 5000 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_10000', title: 'AP Millionaire', desc: 'Earn 10000 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_50000', title: 'AP Legend', desc: 'Earn 50000 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'first_challenge', title: 'Challenger', desc: 'Complete your first challenge', category: 'Practice', icon: 'fa-gamepad', ap: 30 },
    { id: 'challenge_10', title: 'Challenge Addict', desc: 'Complete 10 challenges', category: 'Practice', icon: 'fa-gamepad', ap: 150 },
    { id: 'challenge_25', title: 'Arena Veteran', desc: 'Complete 25 challenges', category: 'Practice', icon: 'fa-gamepad', ap: 400 },
    { id: 'challenge_50', title: 'Challenge Champion', desc: 'Complete 50 challenges', category: 'Practice', icon: 'fa-gamepad', ap: 800 },
    { id: 'challenge_100', title: 'Arena Legend', desc: 'Complete 100 challenges', category: 'Practice', icon: 'fa-gamepad', ap: 2000 },
    { id: 'challenge_perfect', title: 'Perfect Challenge', desc: 'Score 100% on any challenge', category: 'Practice', icon: 'fa-star', ap: 100 },
    { id: 'daily_goal_complete', title: 'Goal Setter', desc: 'Complete your first daily goal', category: 'Consistency', icon: 'fa-bullseye', ap: 20 },
    { id: 'daily_goal_7', title: 'Goal Streak', desc: 'Complete daily goals for 7 days', category: 'Consistency', icon: 'fa-bullseye', ap: 100 },
    { id: 'daily_goal_30', title: 'Goal Master', desc: 'Complete daily goals for 30 days', category: 'Consistency', icon: 'fa-bullseye', ap: 500 },
    { id: 'daily_goal_365', title: 'Goal Legend', desc: 'Complete daily goals for a year', category: 'Consistency', icon: 'fa-bullseye', ap: 5000 },
    { id: 'course_active_3', title: 'Multi-Tasker', desc: 'Have 3 active courses simultaneously', category: 'Learning', icon: 'fa-layer-group', ap: 50 },
    { id: 'course_active_5', title: 'Juggler', desc: 'Have 5 active courses simultaneously', category: 'Learning', icon: 'fa-layer-group', ap: 100 },
    { id: 'placement_complete', title: 'Placed!', desc: 'Complete a placement assessment', category: 'Learning', icon: 'fa-location-dot', ap: 75 },
    { id: 'roadmap_5', title: 'Road Rambler', desc: 'Complete 5 roadmaps', category: 'Roadmaps', icon: 'fa-map', ap: 100 },

    { id: 'leaderboard_top_10', title: 'Leaderboard Contender', desc: 'Reach top 10 on the leaderboard', category: 'Community', icon: 'fa-ranking-star', ap: 150 },
    { id: 'leaderboard_top_3', title: 'Podium Finisher', desc: 'Reach top 3 on the leaderboard', category: 'Community', icon: 'fa-ranking-star', ap: 400 },
    { id: 'leaderboard_1', title: 'Number One', desc: 'Reach #1 on the leaderboard', category: 'Community', icon: 'fa-crown', ap: 1000 },
    { id: 'typing_test_5', title: 'Typing Habit', desc: 'Complete 5 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 30 },
    { id: 'typing_test_25', title: 'Typing Enthusiast', desc: 'Complete 25 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 100 },
    { id: 'explorer', title: 'Site Explorer', desc: 'Visit all main pages of CodeRio', category: 'Learning', icon: 'fa-compass', ap: 30 },
    { id: 'first_login', title: 'Welcome!', desc: 'Log in for the first time', category: 'Consistency', icon: 'fa-right-to-bracket', ap: 10 },
    { id: 'profile_complete', title: 'Profile Complete', desc: 'Fill in all profile fields', category: 'Learning', icon: 'fa-user-check', ap: 30 },
    { id: 'connected_github', title: 'GitHub Connected', desc: 'Connect your GitHub account', category: 'Learning', icon: 'fa-github', ap: 25 },
    { id: 'connected_all', title: 'Fully Connected', desc: 'Connect all available accounts', category: 'Learning', icon: 'fa-link', ap: 100 },
    { id: 'settings_explorer', title: 'Settings Savvy', desc: 'Customize all settings sections', category: 'Learning', icon: 'fa-gear', ap: 30 },
    { id: 'night_owl', title: 'Night Owl', desc: 'Study after midnight', category: 'Consistency', icon: 'fa-moon', ap: 20 },
    { id: 'early_bird', title: 'Early Bird', desc: 'Study before 6 AM', category: 'Consistency', icon: 'fa-sun', ap: 20 },
    { id: 'weekend_warrior', title: 'Weekend Warrior', desc: 'Study for 2 hours on a weekend', category: 'Consistency', icon: 'fa-calendar-weekend', ap: 30 },
    { id: 'no_skip_week', title: 'No Skip Week', desc: 'Study every day for a week', category: 'Consistency', icon: 'fa-calendar-week', ap: 100 },
    { id: 'module_all_one_course', title: 'Course Conqueror', desc: 'Complete all modules of one course', category: 'Learning', icon: 'fa-trophy', ap: 300 },
    { id: 'multilanguage', title: 'Polyglot', desc: 'Study 3 different programming languages', category: 'Learning', icon: 'fa-language', ap: 100 },
    { id: 'backend_beginner', title: 'Backend Explorer', desc: 'Complete a backend course', category: 'Learning', icon: 'fa-server', ap: 50 },
    { id: 'frontend_beginner', title: 'Frontend Explorer', desc: 'Complete a frontend course', category: 'Learning', icon: 'fa-window-maximize', ap: 50 },
    { id: 'database_learner', title: 'Data Keeper', desc: 'Complete a database course', category: 'Learning', icon: 'fa-database', ap: 50 },
    { id: 'devops_learner', title: 'DevOps Explorer', desc: 'Complete a DevOps course', category: 'Learning', icon: 'fa-gears', ap: 50 },
    { id: 'ten_modules_week', title: 'Speed Runner', desc: 'Complete 10 modules in a week', category: 'Learning', icon: 'fa-forward', ap: 150 },
    { id: 'quiz_first_attempt', title: 'Natural Talent', desc: 'Pass a quiz on the first attempt', category: 'Quizzes', icon: 'fa-bolt', ap: 50 },
    { id: 'quiz_no_mistakes', title: 'Quiz Genius', desc: 'Get a perfect score on a hard quiz', category: 'Quizzes', icon: 'fa-brain', ap: 200 },
    { id: 'challenge_time', title: 'Speed Challenger', desc: 'Complete a challenge in under 5 minutes', category: 'Practice', icon: 'fa-stopwatch', ap: 50 },
    { id: 'project_validation', title: 'Quality Assurance', desc: 'Submit a project that passes validation', category: 'Projects', icon: 'fa-check-double', ap: 100 },
    { id: 'project_star', title: 'Star Project', desc: 'Get a project rated 5 stars', category: 'Projects', icon: 'fa-star', ap: 200 },
    { id: 'notes_from_quiz', title: 'Smart Studier', desc: 'Save a note from a quiz question', category: 'Learning', icon: 'fa-pen-fancy', ap: 20 },
    { id: 'course_resume', title: 'Comeback Kid', desc: 'Resume a paused course', category: 'Learning', icon: 'fa-rotate-left', ap: 15 },
    { id: 'course_pause_resume_3', title: 'Strategist', desc: 'Pause and resume courses 3 times', category: 'Learning', icon: 'fa-pause', ap: 30 },
    { id: 'ap_earn_100_day', title: 'AP Sprint', desc: 'Earn 100 AP in a single day', category: 'Consistency', icon: 'fa-bolt', ap: 0 },
    { id: 'ap_earn_500_day', title: 'AP Marathon', desc: 'Earn 500 AP in a single day', category: 'Consistency', icon: 'fa-bolt', ap: 0 },
    { id: 'ap_earn_1000_day', title: 'AP Ultra', desc: 'Earn 1000 AP in a single day', category: 'Consistency', icon: 'fa-bolt', ap: 0 },
    { id: 'quiz_10_perfect', title: 'Perfect Decade', desc: 'Get 10 perfect quiz scores', category: 'Quizzes', icon: 'fa-star', ap: 600 },
    { id: 'typing_test_250', title: 'Typing Machine', desc: 'Complete 250 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 800 },
    { id: 'typing_test_500', title: 'Typing Legend', desc: 'Complete 500 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 2000 },
    { id: 'typing_wpm_130', title: 'Supersonic', desc: 'Reach 130 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 500 },
    { id: 'typing_wpm_150', title: 'World Class', desc: 'Reach 150 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 1000 },
    { id: 'accuracy_100_typing', title: 'Perfect Typing', desc: 'Complete a typing test with 100% accuracy', category: 'Typing', icon: 'fa-bullseye', ap: 200 },
    { id: 'streak_7_paused', title: 'Resilient', desc: 'Maintain a 7-day streak after pausing a course', category: 'Consistency', icon: 'fa-shield', ap: 50 },
    { id: 'notes_100', title: 'Novelist', desc: 'Create 100 notes', category: 'Learning', icon: 'fa-book', ap: 500 },
    { id: 'bookmark_50', title: 'Archivist', desc: 'Bookmark 50 items', category: 'Learning', icon: 'fa-bookmark', ap: 150 },
    { id: 'bookmark_100', title: 'Master Curator', desc: 'Bookmark 100 items', category: 'Learning', icon: 'fa-bookmark', ap: 400 },
    { id: 'first_leaderboard', title: 'On the Board', desc: 'Get ranked on the leaderboard', category: 'Community', icon: 'fa-ranking-star', ap: 25 },
    { id: 'leaderboard_weekly_1', title: 'Weekly Champion', desc: 'Win the weekly leaderboard', category: 'Community', icon: 'fa-crown', ap: 500 },
    { id: 'leaderboard_monthly_1', title: 'Monthly Champion', desc: 'Win the monthly leaderboard', category: 'Community', icon: 'fa-crown', ap: 2000 },
    { id: 'interview_prep', title: 'Interview Ready', desc: 'Complete the interview prep for any course', category: 'Learning', icon: 'fa-user-tie', ap: 100 },
    { id: 'all_categories', title: 'Renaissance Developer', desc: 'Earn achievements in every category', category: 'Learning', icon: 'fa-star', ap: 500 },
    { id: 'achievement_10', title: 'Achievement Hunter', desc: 'Earn 10 achievements', category: 'Consistency', icon: 'fa-medal', ap: 50 },
    { id: 'achievement_25', title: 'Achievement Collector', desc: 'Earn 25 achievements', category: 'Consistency', icon: 'fa-medal', ap: 150 },
    { id: 'achievement_50', title: 'Achievement Seeker', desc: 'Earn 50 achievements', category: 'Consistency', icon: 'fa-medal', ap: 400 },
    { id: 'achievement_75', title: 'Achievement Master', desc: 'Earn 75 achievements', category: 'Consistency', icon: 'fa-medal', ap: 800 },
    { id: 'achievement_100', title: 'Century of Achievements', desc: 'Earn 100 achievements', category: 'Consistency', icon: 'fa-medal', ap: 1500 },
    { id: 'achievement_150', title: 'Achievement Legend', desc: 'Earn 150 achievements', category: 'Consistency', icon: 'fa-medal', ap: 3000 },
    { id: 'achievement_200', title: 'Completionist', desc: 'Earn all 200+ achievements', category: 'Consistency', icon: 'fa-medal', ap: 10000 },
    { id: 'challenge_perfect_5', title: 'Challenge Perfectionist', desc: 'Get 5 perfect challenge scores', category: 'Practice', icon: 'fa-star', ap: 400 },
    { id: 'challenge_perfect_10', title: 'Challenge God', desc: 'Get 10 perfect challenge scores', category: 'Practice', icon: 'fa-star', ap: 800 },
    { id: 'daily_goal_3', title: 'Goal Starter', desc: 'Complete daily goals for 3 days', category: 'Consistency', icon: 'fa-bullseye', ap: 40 },
    { id: 'daily_goal_14', title: 'Goal Dedicated', desc: 'Complete daily goals for 14 days', category: 'Consistency', icon: 'fa-bullseye', ap: 200 },
    { id: 'daily_goal_60', title: 'Goal Champion', desc: 'Complete daily goals for 60 days', category: 'Consistency', icon: 'fa-bullseye', ap: 1000 },
    { id: 'daily_goal_100', title: 'Goal Legendary', desc: 'Complete daily goals for 100 days', category: 'Consistency', icon: 'fa-bullseye', ap: 2500 },
    { id: 'practice_250', title: 'Problem Veteran', desc: 'Solve 250 practice problems', category: 'Practice', icon: 'fa-pen', ap: 1000 },
    { id: 'practice_1000', title: 'Problem Grandmaster', desc: 'Solve 1000 practice problems', category: 'Practice', icon: 'fa-pen', ap: 5000 },
    { id: 'project_50', title: 'Project Guru', desc: 'Complete 50 projects', category: 'Projects', icon: 'fa-code', ap: 3000 },
    { id: 'project_100', title: 'Project Titan', desc: 'Complete 100 projects', category: 'Projects', icon: 'fa-code', ap: 10000 },
    { id: 'course_7', title: 'Lucky 7', desc: 'Complete 7 courses', category: 'Learning', icon: 'fa-trophy', ap: 3000 },
    { id: 'course_15', title: 'Fifteen and Fabulous', desc: 'Complete 15 courses', category: 'Learning', icon: 'fa-trophy', ap: 8000 },
    { id: 'course_20', title: 'Course Connoisseur', desc: 'Complete 20 courses', category: 'Learning', icon: 'fa-trophy', ap: 15000 },
    { id: 'module_50', title: 'Module Machine', desc: 'Complete 50 modules', category: 'Learning', icon: 'fa-layer-group', ap: 500 },
    { id: 'module_100', title: 'Module Mountain', desc: 'Complete 100 modules', category: 'Learning', icon: 'fa-layer-group', ap: 1500 },
    { id: 'lesson_500', title: 'Learning Machine', desc: 'Complete 500 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 2500 },
    { id: 'lesson_1000', title: 'Knowledge Titan', desc: 'Complete 1000 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 10000 },
    { id: 'quiz_250', title: 'Quiz Overlord', desc: 'Pass 250 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 1500 },
    { id: 'quiz_500', title: 'Quiz Deity', desc: 'Pass 500 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 5000 },
    { id: 'quiz_accuracy_90_avg', title: 'Consistent Excellence', desc: 'Maintain 90%+ average quiz accuracy over 10 quizzes', category: 'Quizzes', icon: 'fa-chart-line', ap: 300 },
    { id: 'quiz_accuracy_95_avg', title: 'Near Perfection', desc: 'Maintain 95%+ average quiz accuracy over 10 quizzes', category: 'Quizzes', icon: 'fa-chart-line', ap: 600 },
    { id: 'typing_250', title: 'Typing Devotee', desc: 'Complete 250 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 800 },
    { id: 'typing_500', title: 'Typing Master', desc: 'Complete 500 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 2500 },
    { id: 'reminder_set', title: 'Reminder Setter', desc: 'Configure your first reminder', category: 'Learning', icon: 'fa-bell', ap: 10 },
    { id: 'job_saved', title: 'Career Planner', desc: 'Save your first job listing', category: 'Learning', icon: 'fa-briefcase', ap: 20 },
    { id: 'career_insight_viewed', title: 'Career Explorer', desc: 'View your career insights', category: 'Learning', icon: 'fa-chart-bar', ap: 15 },
    { id: 'country_detected', title: 'Global Developer', desc: 'View country-specific career data', category: 'Learning', icon: 'fa-globe', ap: 20 },
    { id: 'quiz_challenge_50', title: 'Challenge 50', desc: 'Score 50% on the quiz challenge', category: 'Quizzes', icon: 'fa-check-circle', ap: 50 },
    { id: 'quiz_challenge_75', title: 'Challenge 75', desc: 'Score 75% on the quiz challenge', category: 'Quizzes', icon: 'fa-check-circle', ap: 100 },
    { id: 'quiz_challenge_90', title: 'Challenge Elite', desc: 'Score 90%+ on the quiz challenge', category: 'Quizzes', icon: 'fa-check-circle', ap: 200 },
    { id: 'quiz_challenge_100', title: 'Challenge Perfect', desc: 'Score 100% on the quiz challenge', category: 'Quizzes', icon: 'fa-star', ap: 500 },
    { id: 'challenge_arena_5', title: 'Arena Fighter', desc: 'Complete 5 quiz challenges', category: 'Quizzes', icon: 'fa-swords', ap: 100 },
    { id: 'challenge_arena_25', title: 'Arena Gladiator', desc: 'Complete 25 quiz challenges', category: 'Quizzes', icon: 'fa-swords', ap: 500 },
    { id: 'challenge_arena_100', title: 'Arena Champion', desc: 'Complete 100 quiz challenges', category: 'Quizzes', icon: 'fa-swords', ap: 2000 },

    { id: 'project_explanation', title: 'Knowledge Sharer', desc: 'Write a detailed project explanation', category: 'Projects', icon: 'fa-pen-to-square', ap: 50 },
    { id: 'job_search_started', title: 'Job Seeker', desc: 'View job listings on the career insights page', category: 'Career', icon: 'fa-briefcase', ap: 15 },
    { id: 'job_saved_3', title: 'Career Focused', desc: 'Save 3 job listings', category: 'Career', icon: 'fa-briefcase', ap: 30 },
    { id: 'job_saved_10', title: 'Job Hunter', desc: 'Save 10 job listings', category: 'Career', icon: 'fa-briefcase', ap: 80 },
    { id: 'job_saved_25', title: 'Career Strategist', desc: 'Save 25 job listings', category: 'Career', icon: 'fa-briefcase', ap: 200 },
    { id: 'interview_questions_viewed', title: 'Interview Prep', desc: 'View interview questions for any course', category: 'Career', icon: 'fa-question-circle', ap: 20 },
    { id: 'interview_questions_10', title: 'Interview Ready', desc: 'Study interview questions for 10 courses', category: 'Career', icon: 'fa-user-tie', ap: 100 },
    { id: 'interview_questions_all', title: 'Interview Master', desc: 'Study interview questions for all courses', category: 'Career', icon: 'fa-user-graduate', ap: 500 },
    { id: 'career_country_switched', title: 'Global Explorer', desc: 'Switch between 3 different countries in career insights', category: 'Career', icon: 'fa-flag', ap: 25 },
    { id: 'salary_compared', title: 'Salary Analyst', desc: 'Compare salaries across 5 different roles', category: 'Career', icon: 'fa-chart-simple', ap: 30 },
    { id: 'remote_roles_viewed', title: 'Remote Ready', desc: 'Explore remote work opportunities section', category: 'Career', icon: 'fa-wifi', ap: 20 },
    { id: 'daily_goal_200', title: 'Goal Veteran', desc: 'Complete daily goals for 200 days', category: 'Consistency', icon: 'fa-bullseye', ap: 5000 },
    { id: 'daily_goal_500', title: 'Goal Immortal', desc: 'Complete daily goals for 500 days', category: 'Consistency', icon: 'fa-bullseye', ap: 15000 },
    { id: 'typing_test_1000', title: 'Typing Immortal', desc: 'Complete 1000 typing tests', category: 'Typing', icon: 'fa-keyboard', ap: 5000 },
    { id: 'typing_wpm_180', title: 'Typing God', desc: 'Reach 180 WPM on a typing test', category: 'Typing', icon: 'fa-gauge-high', ap: 2000 },
    { id: 'streak_200', title: 'Double Century', desc: 'Achieve a 200-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 5000 },
    { id: 'streak_500', title: 'Half Millennia', desc: 'Achieve a 500-day streak', category: 'Consistency', icon: 'fa-calendar-check', ap: 20000 },
    { id: 'time_2000h', title: 'Learning Immortal', desc: 'Spend 2000 hours learning', category: 'Consistency', icon: 'fa-clock', ap: 30000 },
    { id: 'ap_100000', title: 'AP Billionaire', desc: 'Earn 100000 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'ap_250000', title: 'AP Infinite', desc: 'Earn 250000 Achievement Points', category: 'Consistency', icon: 'fa-coins', ap: 0 },
    { id: 'module_250', title: 'Module Legend', desc: 'Complete 250 modules', category: 'Learning', icon: 'fa-layer-group', ap: 5000 },
    { id: 'module_500', title: 'Module God', desc: 'Complete 500 modules', category: 'Learning', icon: 'fa-layer-group', ap: 15000 },
    { id: 'lesson_2000', title: 'Knowledge Demigod', desc: 'Complete 2000 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 25000 },
    { id: 'lesson_5000', title: 'Knowledge Divine', desc: 'Complete 5000 lessons', category: 'Learning', icon: 'fa-graduation-cap', ap: 50000 },
    { id: 'quiz_1000', title: 'Quiz Transcendent', desc: 'Pass 1000 quizzes', category: 'Quizzes', icon: 'fa-check-circle', ap: 15000 },
    { id: 'quiz_perfect_25', title: 'Perfect Quarter', desc: 'Get 25 perfect quiz scores', category: 'Quizzes', icon: 'fa-star', ap: 1500 },
    { id: 'quiz_perfect_50', title: 'Perfect Half Century', desc: 'Get 50 perfect quiz scores', category: 'Quizzes', icon: 'fa-star', ap: 4000 },
    { id: 'quiz_perfect_100', title: 'Perfection Incarnate', desc: 'Get 100 perfect quiz scores', category: 'Quizzes', icon: 'fa-star', ap: 10000 },
    { id: 'practice_2000', title: 'Algorithm King', desc: 'Solve 2000 practice problems', category: 'Practice', icon: 'fa-pen', ap: 10000 },
    { id: 'practice_5000', title: 'Algorithm God', desc: 'Solve 5000 practice problems', category: 'Practice', icon: 'fa-pen', ap: 25000 },
    { id: 'achievement_250', title: 'Ultimate Collector', desc: 'Earn 250 achievements', category: 'Consistency', icon: 'fa-medal', ap: 20000 },
    { id: 'course_enrolled_5', title: 'Course Collector', desc: 'Enroll in 5 courses', category: 'Learning', icon: 'fa-cart-plus', ap: 30 },
    { id: 'course_enrolled_10', title: 'Course Hoarder', desc: 'Enroll in 10 courses', category: 'Learning', icon: 'fa-cart-plus', ap: 60 },
    { id: 'course_enrolled_20', title: 'Course Enthusiast', desc: 'Enroll in 20 courses', category: 'Learning', icon: 'fa-cart-plus', ap: 120 },
    { id: 'course_enrolled_all', title: 'Completionist', desc: 'Enroll in all available courses', category: 'Learning', icon: 'fa-cart-plus', ap: 500 },
    { id: 'daily_login_7', title: 'Daily Devotee', desc: 'Log in for 7 consecutive days', category: 'Consistency', icon: 'fa-right-to-bracket', ap: 50 },
    { id: 'daily_login_30', title: 'Monthly Regular', desc: 'Log in for 30 consecutive days', category: 'Consistency', icon: 'fa-right-to-bracket', ap: 300 },
    { id: 'daily_login_100', title: 'Century Login', desc: 'Log in for 100 consecutive days', category: 'Consistency', icon: 'fa-right-to-bracket', ap: 1500 },
    { id: 'night_study_5', title: 'Night Study', desc: 'Study after midnight 5 times', category: 'Consistency', icon: 'fa-moon', ap: 40 },
    { id: 'weekend_study_10', title: 'Weekend Developer', desc: 'Study on 10 weekends', category: 'Consistency', icon: 'fa-calendar-weekend', ap: 80 },
    { id: 'interview_first_view', title: 'Interview Explorer', desc: 'View your first interview question', category: 'Learning', icon: 'fa-clipboard-question', ap: 20 },
    { id: 'interview_50', title: 'Interview Seeker', desc: 'View 50 interview questions', category: 'Learning', icon: 'fa-clipboard-question', ap: 50 },
    { id: 'interview_200', title: 'Interview Veteran', desc: 'View 200 interview questions', category: 'Learning', icon: 'fa-clipboard-question', ap: 200 },
    { id: 'interview_bookmark_first', title: 'Question Saver', desc: 'Bookmark your first interview question', category: 'Learning', icon: 'fa-bookmark', ap: 10 },
    { id: 'interview_bookmark_20', title: 'Interview Curator', desc: 'Bookmark 20 interview questions', category: 'Learning', icon: 'fa-bookmark', ap: 50 },
    { id: 'interview_studied_first', title: 'Study Starter', desc: 'Mark your first question as studied', category: 'Learning', icon: 'fa-check-circle', ap: 15 },
    { id: 'interview_studied_50', title: 'Interview Scholar', desc: 'Study 50 interview questions', category: 'Learning', icon: 'fa-check-circle', ap: 100 },
    { id: 'interview_all_courses', title: 'Interview Grandmaster', desc: 'Study questions across all 28 interview courses', category: 'Learning', icon: 'fa-globe', ap: 500 },
    { id: 'interactive_done', title: 'Code Tinkerer', desc: 'Run your first interactive code exercise', category: 'Practice', icon: 'fa-laptop-code', ap: 20 },
    { id: 'interactive_25', title: 'Code Experimenter', desc: 'Run 25 interactive code exercises', category: 'Practice', icon: 'fa-laptop-code', ap: 100 }
  ],

  getUserAchievements() {
    return Utils.getStorage('achievements', []);
  },

  getUserAP() {
    return Utils.getStorage('achievement_points', 0);
  },

  getEarnedIds() {
    return this.getUserAchievements().map(function(a) { return a.id; });
  },

  checkAndAward(courseId) {
    var earned = this.getEarnedIds();
    var awarded = [];
    var progress = Utils.getStorage('course_progress', {});
    var quizAttempts = Utils.getStorage('quiz_attempts', {});
    var typingHistory = Utils.getStorage('typing_history', []);
    var activity = Utils.getStorage('coderio_activity', []);
    var ap = this.getUserAP();
    var allAchievements = Utils.getStorage('achievements', []);

    var totalLessons = 0;
    var totalModules = 0;
    var totalTime = 0;
    var completedCoursesCount = 0;
    var activeCourses = 0;
    var totalEnrolled = Object.keys(progress).length;
    Object.keys(progress).forEach(function(cid) {
      var c = progress[cid];
      totalLessons += (c.lessonsCompleted || []).length;
      totalModules += (c.modulesCompleted || []).length;
      totalTime += c.timeSpent || 0;
      if (c.status === 'completed') completedCoursesCount++;
      if (c.status === 'active') activeCourses++;
    });

    var totalQuizPasses = 0;
    var perfectScores = 0;
    var quizStreak = 0;
    var maxQuizStreak = 0;
    Object.keys(quizAttempts).forEach(function(qid) {
      var attempts = quizAttempts[qid];
      attempts.forEach(function(a) {
        if (a.passed) {
          totalQuizPasses++;
          quizStreak++;
          if (quizStreak > maxQuizStreak) maxQuizStreak = quizStreak;
        } else {
          quizStreak = 0;
        }
        if (a.percentage >= 1) perfectScores++;
      });
    });

    var totalTypingTests = typingHistory.length;
    var bestWpm = typingHistory.length > 0 ? Math.max.apply(null, typingHistory.map(function(t) { return t.wpm || 0; })) : 0;
    var bestAccuracy = typingHistory.length > 0 ? Math.max.apply(null, typingHistory.map(function(t) { return Math.round(t.accuracy || 0); })) : 0;

    var streakData = typeof LearningTracker !== 'undefined' ? LearningTracker._calcStreak() : { currentStreak: 0, longestStreak: 0 };

    var tracking = Utils.getStorage('interview_tracking', {});
    var viewedCount = 0; var bookmarkedCount = 0; var studiedCount = 0; var studiedCourses = {};
    if (tracking.viewed) Object.keys(tracking.viewed).forEach(function(c) { Object.keys(tracking.viewed[c]).forEach(function() { viewedCount++; }); });
    if (tracking.bookmarked) Object.keys(tracking.bookmarked).forEach(function(c) { Object.keys(tracking.bookmarked[c]).forEach(function() { bookmarkedCount++; }); });
    if (tracking.studied) Object.keys(tracking.studied).forEach(function(c) { Object.keys(tracking.studied[c]).forEach(function() { studiedCount++; studiedCourses[c] = true; }); });
    var studiedCourseCount = Object.keys(studiedCourses).length;
    var interactiveRuns = Utils.getStorage('interactive_runs', 0);

    var check = function(condition, ach) {
      if (condition && earned.indexOf(ach.id) === -1) {
        allAchievements.push({ id: ach.id, title: ach.title, desc: ach.desc, category: ach.category, icon: ach.icon, ap: ach.ap, unlockedAt: new Date().toISOString() });
        ap += ach.ap;
        awarded.push(ach);
      }
    };

    this.ACHIEVEMENTS.forEach(function(ach) {
      switch (ach.id) {
        case 'first_lesson': check(totalLessons >= 1, ach); break;
        case 'lesson_5': check(totalLessons >= 5, ach); break;
        case 'lesson_10': check(totalLessons >= 10, ach); break;
        case 'lesson_25': check(totalLessons >= 25, ach); break;
        case 'lesson_50': check(totalLessons >= 50, ach); break;
        case 'lesson_100': check(totalLessons >= 100, ach); break;
        case 'first_module': check(totalModules >= 1, ach); break;
        case 'module_10': check(totalModules >= 10, ach); break;
        case 'module_25': check(totalModules >= 25, ach); break;
        case 'module_50': check(totalModules >= 50, ach); break;
        case 'module_100': check(totalModules >= 100, ach); break;
        case 'lesson_500': check(totalLessons >= 500, ach); break;
        case 'lesson_1000': check(totalLessons >= 1000, ach); break;
        case 'first_course': check(completedCoursesCount >= 1, ach); break;
        case 'course_3': check(completedCoursesCount >= 3, ach); break;
        case 'course_5': check(completedCoursesCount >= 5, ach); break;
        case 'course_7': check(completedCoursesCount >= 7, ach); break;
        case 'course_10': check(completedCoursesCount >= 10, ach); break;
        case 'course_15': check(completedCoursesCount >= 15, ach); break;
        case 'course_20': check(completedCoursesCount >= 20, ach); break;
        case 'first_quiz_pass': check(totalQuizPasses >= 1, ach); break;
        case 'quiz_10': check(totalQuizPasses >= 10, ach); break;
        case 'quiz_25': check(totalQuizPasses >= 25, ach); break;
        case 'quiz_50': check(totalQuizPasses >= 50, ach); break;
        case 'quiz_100': check(totalQuizPasses >= 100, ach); break;
        case 'quiz_250': check(totalQuizPasses >= 250, ach); break;
        case 'quiz_500': check(totalQuizPasses >= 500, ach); break;
        case 'quiz_perfect': check(perfectScores >= 1, ach); break;
        case 'quiz_perfect_5': check(perfectScores >= 5, ach); break;
        case 'quiz_10_perfect': check(perfectScores >= 10, ach); break;
        case 'quiz_streak': check(maxQuizStreak >= 5, ach); break;
        case 'quiz_first_attempt': {
          var firstAttemptPasses = 0;
          Object.keys(quizAttempts).forEach(function(qid) {
            var attempts = quizAttempts[qid];
            if (attempts.length > 0 && attempts[0].passed) firstAttemptPasses++;
          });
          check(firstAttemptPasses >= 1, ach);
          break;
        }
        case 'first_typing': check(totalTypingTests >= 1, ach); break;
        case 'typing_10': check(totalTypingTests >= 10, ach); break;
        case 'typing_50': check(totalTypingTests >= 50, ach); break;
        case 'typing_100': check(totalTypingTests >= 100, ach); break;
        case 'typing_250': check(totalTypingTests >= 250, ach); break;
        case 'typing_500': check(totalTypingTests >= 500, ach); break;
        case 'typing_wpm_30': check(bestWpm >= 30, ach); break;
        case 'typing_wpm_50': check(bestWpm >= 50, ach); break;
        case 'typing_wpm_70': check(bestWpm >= 70, ach); break;
        case 'typing_wpm_90': check(bestWpm >= 90, ach); break;
        case 'typing_wpm_110': check(bestWpm >= 110, ach); break;
        case 'typing_wpm_130': check(bestWpm >= 130, ach); break;
        case 'typing_wpm_150': check(bestWpm >= 150, ach); break;
        case 'typing_accuracy_95': check(bestAccuracy >= 95, ach); break;
        case 'typing_accuracy_99': check(bestAccuracy >= 99, ach); break;
        case 'accuracy_100_typing': check(bestAccuracy >= 100, ach); break;
        case 'typing_test_5': check(totalTypingTests >= 5, ach); break;
        case 'typing_test_25': check(totalTypingTests >= 25, ach); break;
        case 'streak_3': check(streakData.longestStreak >= 3, ach); break;
        case 'streak_7': check(streakData.longestStreak >= 7, ach); break;
        case 'streak_14': check(streakData.longestStreak >= 14, ach); break;
        case 'streak_21': check(streakData.longestStreak >= 21, ach); break;
        case 'streak_30': check(streakData.longestStreak >= 30, ach); break;
        case 'streak_60': check(streakData.longestStreak >= 60, ach); break;
        case 'streak_100': check(streakData.longestStreak >= 100, ach); break;
        case 'streak_365': check(streakData.longestStreak >= 365, ach); break;
        case 'time_1h': check(totalTime >= 3600000, ach); break;
        case 'time_5h': check(totalTime >= 18000000, ach); break;
        case 'time_10h': check(totalTime >= 36000000, ach); break;
        case 'time_25h': check(totalTime >= 90000000, ach); break;
        case 'time_50h': check(totalTime >= 180000000, ach); break;
        case 'time_100h': check(totalTime >= 360000000, ach); break;
        case 'time_500h': check(totalTime >= 1800000000, ach); break;
        case 'time_1000h': check(totalTime >= 3600000000, ach); break;
        case 'course_active_3': check(activeCourses >= 3, ach); break;
        case 'course_active_5': check(activeCourses >= 5, ach); break;
        case 'ap_100': check(ap >= 100, ach); break;
        case 'ap_500': check(ap >= 500, ach); break;
        case 'ap_1000': check(ap >= 1000, ach); break;
        case 'ap_2500': check(ap >= 2500, ach); break;
        case 'ap_5000': check(ap >= 5000, ach); break;
        case 'ap_10000': check(ap >= 10000, ach); break;
        case 'ap_50000': check(ap >= 50000, ach); break;
        case 'achievement_10': check(allAchievements.length >= 10, ach); break;
        case 'achievement_25': check(allAchievements.length >= 25, ach); break;
        case 'achievement_50': check(allAchievements.length >= 50, ach); break;
        case 'achievement_75': check(allAchievements.length >= 75, ach); break;
        case 'achievement_100': check(allAchievements.length >= 100, ach); break;
        case 'achievement_150': check(allAchievements.length >= 150, ach); break;
        case 'achievement_200': check(allAchievements.length >= 200, ach); break;
        case 'achievement_250': check(allAchievements.length >= 250, ach); break;
        case 'typing_test_1000': check(totalTypingTests >= 1000, ach); break;
        case 'typing_wpm_180': check(bestWpm >= 180, ach); break;
        case 'streak_200': check(streakData.longestStreak >= 200, ach); break;
        case 'streak_500': check(streakData.longestStreak >= 500, ach); break;
        case 'time_2000h': check(totalTime >= 7200000000, ach); break;
        case 'ap_100000': check(ap >= 100000, ach); break;
        case 'ap_250000': check(ap >= 250000, ach); break;
        case 'module_250': check(totalModules >= 250, ach); break;
        case 'module_500': check(totalModules >= 500, ach); break;
        case 'lesson_2000': check(totalLessons >= 2000, ach); break;
        case 'lesson_5000': check(totalLessons >= 5000, ach); break;
        case 'quiz_1000': check(totalQuizPasses >= 1000, ach); break;
        case 'quiz_perfect_25': check(perfectScores >= 25, ach); break;
        case 'quiz_perfect_50': check(perfectScores >= 50, ach); break;
        case 'quiz_perfect_100': check(perfectScores >= 100, ach); break;
        case 'course_enrolled_5': check(totalEnrolled >= 5, ach); break;
        case 'course_enrolled_10': check(totalEnrolled >= 10, ach); break;
        case 'course_enrolled_20': check(totalEnrolled >= 20, ach); break;
        case 'course_enrolled_all': check(totalEnrolled >= 24, ach); break;
        case 'interview_first_view': check(viewedCount >= 1, ach); break;
        case 'interview_50': check(viewedCount >= 50, ach); break;
        case 'interview_200': check(viewedCount >= 200, ach); break;
        case 'interview_bookmark_first': check(bookmarkedCount >= 1, ach); break;
        case 'interview_bookmark_20': check(bookmarkedCount >= 20, ach); break;
        case 'interview_studied_first': check(studiedCount >= 1, ach); break;
        case 'interview_studied_50': check(studiedCount >= 50, ach); break;
        case 'interview_all_courses': check(studiedCourseCount >= 28, ach); break;
        case 'interactive_done': check(interactiveRuns >= 1, ach); break;
        case 'interactive_25': check(interactiveRuns >= 25, ach); break;
        case 'daily_goal_200': case 'daily_goal_500': case 'daily_login_7': case 'daily_login_30': case 'daily_login_100': case 'night_study_5': case 'weekend_study_10': case 'practice_2000': case 'practice_5000': case 'job_search_started': case 'job_saved_3': case 'job_saved_10': case 'job_saved_25': case 'interview_questions_viewed': case 'interview_questions_10': case 'interview_questions_all': case 'career_country_switched': case 'salary_compared': case 'remote_roles_viewed': break;
        default: break;
      }
    });

    if (awarded.length > 0) {
      Utils.setStorage('achievements', allAchievements);
      Utils.setStorage('achievement_points', ap);
      awarded.forEach(function(ach) {
        setTimeout(function() {
          Utils.showToast('Achievement Unlocked: ' + ach.title + '! +' + ach.ap + ' AP', 'success');
        }, 500);
      });
    }
  },

  getByCategory(category) {
    return this.ACHIEVEMENTS.filter(function(a) { return a.category === category; });
  },

  getCategories() {
    var cats = {};
    this.ACHIEVEMENTS.forEach(function(a) {
      if (!cats[a.category]) cats[a.category] = 0;
      cats[a.category]++;
    });
    return Object.keys(cats).map(function(k) { return { name: k, count: cats[k] }; });
  },

  renderAchievementsGrid(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var earned = this.getEarnedIds();
    var cats = this.getCategories();
    var html = '';

    cats.forEach(function(cat) {
      var achievements = typeof AchievementSystem !== 'undefined' ? AchievementSystem.getByCategory(cat.name) : [];
      var earnedInCat = achievements.filter(function(a) { return earned.indexOf(a.id) !== -1; }).length;
      html += '<div class="achievement-category"><h3>' + cat.name + ' <span class="cat-count">(' + earnedInCat + '/' + cat.count + ')</span></h3>';
      html += '<div class="achievement-grid">';
      achievements.forEach(function(ach) {
        var isEarned = earned.indexOf(ach.id) !== -1;
        html += '<div class="achievement-card' + (isEarned ? '' : ' locked') + '" title="' + Utils.sanitize(ach.desc) + '">'
          + '<div class="achievement-icon"><i class="fas ' + ach.icon + '"></i></div>'
          + '<div class="achievement-info"><h4>' + Utils.sanitize(ach.title) + '</h4>'
          + '<p>' + Utils.sanitize(ach.desc) + '</p>'
          + '<span class="achievement-ap">+' + ach.ap + ' AP</span></div></div>';
      });
      html += '</div></div>';
    });

    container.innerHTML = html;
  }
};
