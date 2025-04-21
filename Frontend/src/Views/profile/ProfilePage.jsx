import { useState } from 'react';
import { Clock, Code, Award, BookOpen, Edit, Github, Twitter, Link as LinkIcon, MessageSquare, ThumbsUp, User, Users, Heart, Moon, Sun, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    bio: "Passionate developer with 8+ years of experience in web and mobile development. I love solving complex problems and contributing to open source projects.",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
    github: "github.com/alexjohnson",
    twitter: "twitter.com/alexjcode",
    website: "alexjohnson.dev",
    achievements: [
      { title: "Problem Solver", description: "Solved 200+ questions", icon: <Code /> },
      { title: "Knowledge Sharer", description: "50+ detailed answers", icon: <BookOpen /> },
      { title: "Community Builder", description: "Started 3 popular threads", icon: <Users /> }
    ]
  });
  
  const [editedProfile, setEditedProfile] = useState({...profile});

  
  const handleOpenEditDialog = () => {
    setEditedProfile({...profile});
    setEditDialogOpen(true);
  };
  
  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditDialogOpen(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({...editedProfile, [name]: value});
  };
  
  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditedProfile({...editedProfile, skills});
  };
  

  const cardClasses = `bg-white dark:bg-gray-900 shadow-sm`;
  const textClasses = `text-gray-800 dark:text-gray-200`;
  const mutedTextClasses = `text-gray-600 dark:text-gray-400`;

  return (
    <div className='min-h-screen transition-colors duration-200 dark:bg-gray-950 bg-gray-50'>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
      
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-white relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-44 w-44 border-4 ml-4 border-white">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-blue-500 text-white">AJ</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left justify-center sm:justify-start">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-1 text-sm text-white/90">
                  <span>{profile.title}</span>
                  <span>•</span>
                  <span>{profile.location}</span>
                </div>
                
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    5.8K Rep
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    78 Solutions
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    246 Responses
                  </Badge>
                </div>
              </div>
              
              <Button onClick={handleOpenEditDialog} size="sm" variant="secondary" className="absolute top-4 right-4">
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className={`p-5 ${cardClasses}`}>
            <h3 className={`font-medium text-lg mb-3 ${textClasses}`}>About</h3>
            <p className={mutedTextClasses}>{profile.bio}</p>
            
            <div className="mt-4">
              <h4 className={`font-medium mb-2 ${textClasses}`}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <a href={`https://${profile.github}`} className={`flex items-center ${mutedTextClasses} hover:text-blue-600 dark:hover:text-blue-400`}>
                <Github className="h-4 w-4 mr-2" />
                {profile.github}
              </a>
              <a href={`https://${profile.twitter}`} className={`flex items-center ${mutedTextClasses} hover:text-blue-600 dark:hover:text-blue-400`}>
                <Twitter className="h-4 w-4 mr-2" />
                {profile.twitter}
              </a>
              <a href={`https://${profile.website}`} className={`flex items-center ${mutedTextClasses} hover:text-blue-600 dark:hover:text-blue-400`}>
                <LinkIcon className="h-4 w-4 mr-2" />
                {profile.website}
              </a>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <Alert className={darkMode ? "border-blue-800 bg-blue-950/50" : "border-blue-100 bg-blue-50"}>
              <Heart className={`h-4 w-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <AlertTitle className={textClasses}>Streak: 42 days!</AlertTitle>
              <AlertDescription className={mutedTextClasses}>
                Keep up the great contributions!
              </AlertDescription>
            </Alert>
            
            {/* Achievements */}
            <Card className={`p-5 ${cardClasses}`}>
              <h3 className={`font-medium text-lg mb-3 ${textClasses}`}>Achievements</h3>
              <div className="space-y-4">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"} p-2 rounded-lg mr-3`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className={`font-medium ${textClasses}`}>{achievement.title}</h4>
                      <p className={`text-sm ${mutedTextClasses}`}>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Badges Preview */}
            <Card className={`p-5 ${cardClasses}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-medium text-lg ${textClasses}`}>Top Badges</h3>
                <Button variant="ghost" size="sm" className={mutedTextClasses}>View All</Button>
              </div>
              <div className="flex justify-between gap-2">
                {[
                  { name: "First Solution", icon: <Award />, level: "gold" },
                  { name: "Team Player", icon: <Users />, level: "gold" },
                  { name: "Helping Hand", icon: <Heart />, level: "silver" },
                ].map((badge, index) => (
                  <div key={index} className={`border ${darkMode ? "border-gray-800" : "border-gray-200"} rounded-lg p-3 flex flex-col items-center text-center flex-1`}>
                    <div className={`p-2 rounded-full mb-2 ${
                      badge.level === "gold" ? `${darkMode ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-600"}` :
                      badge.level === "silver" ? `${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}` :
                      `${darkMode ? "bg-orange-900/30 text-orange-400" : "bg-orange-100 text-orange-600"}`
                    }`}>
                      {badge.icon}
                    </div>
                    <p className={`text-xs ${mutedTextClasses} capitalize`}>{badge.level}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className={`mb-2 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="space-y-4">
                <Card className={`p-5 ${cardClasses}`}>
                  <h3 className={`font-medium text-lg mb-3 ${textClasses}`}>Activity Overview</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm font-medium ${textClasses}`}>Solutions</span>
                        <span className={`text-sm font-medium ${textClasses}`}>78%</span>
                      </div>
                      <Progress value={78} className={`h-2 ${darkMode ? "bg-gray-800" : ""}`} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm font-medium ${textClasses}`}>Questions</span>
                        <span className={`text-sm font-medium ${textClasses}`}>45%</span>
                      </div>
                      <Progress value={45} className={`h-2 ${darkMode ? "bg-gray-800" : ""}`} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm font-medium ${textClasses}`}>Comments</span>
                        <span className={`text-sm font-medium ${textClasses}`}>92%</span>
                      </div>
                      <Progress value={92} className={`h-2 ${darkMode ? "bg-gray-800" : ""}`} />
                    </div>
                  </div>
                </Card>
                
                <Card className={`p-5 ${cardClasses}`}>
                  <h3 className={`font-medium text-lg mb-3 ${textClasses}`}>Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"} pb-3 last:border-0 last:pb-0`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span className={`font-medium ${textClasses}`}>Commented on "React rendering optimization"</span>
                          </div>
                          <span className={`text-sm ${mutedTextClasses} flex items-center gap-1`}>
                            <Clock className="h-3 w-3" /> 
                            {index === 0 ? "2h ago" : index === 1 ? "Yesterday" : "3d ago"}
                          </span>
                        </div>
                        <p className={`text-sm ${mutedTextClasses} mt-1 pl-6`}>
                          "You might want to consider using React.memo for expensive renders..."
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">Load More</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="solutions" className="space-y-4">
                <Card className={`p-5 ${cardClasses}`}>
                  <h3 className={`font-medium text-lg mb-3 ${textClasses}`}>Top Solutions</h3>
                  <div className="space-y-4">
                    {[1, 2].map((_, index) => (
                      <div key={index} className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"} pb-3 last:border-0 last:pb-0`}>
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${textClasses}`}>JWT authentication in React</h4>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" /> 
                            {42 - index * 12}
                          </Badge>
                        </div>
                        <p className={`text-sm ${mutedTextClasses} mt-1`}>
                          "First, you need to set up your API endpoints to generate tokens..."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>react</Badge>
                          <Badge>jwt</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Solutions</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="questions" className="space-y-4">
                <Card className={`p-5 ${cardClasses}`}>
                  <h3 className={`font-medium text-lg mb-3 ${textClasses}`}>Your Questions</h3>
                  <div className="space-y-4">
                    {[1, 2].map((_, index) => (
                      <div key={index} className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"} pb-3 last:border-0 last:pb-0`}>
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${textClasses}`}>State management in large React apps</h4>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" /> 
                            {8 - index * 2}
                          </Badge>
                        </div>
                        <p className={`text-sm ${mutedTextClasses} mt-1`}>
                          "I'm working on a large-scale app and struggling with state..."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>react</Badge>
                          <Badge>redux</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Questions</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className={`sm:max-w-md ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
          <DialogHeader>
            <DialogTitle className={textClasses}>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${textClasses}`}>Name</label>
              <Input
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${textClasses}`}>Title</label>
                <Input
                  name="title"
                  value={editedProfile.title}
                  onChange={handleChange}
                  className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-medium ${textClasses}`}>Location</label>
                <Input
                  name="location"
                  value={editedProfile.location}
                  onChange={handleChange}
                  className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={`text-sm font-medium ${textClasses}`}>Bio</label>
              <Textarea
                name="bio"
                value={editedProfile.bio}
                onChange={handleChange}
                rows={3}
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <label className={`text-sm font-medium ${textClasses}`}>Skills (comma separated)</label>
              <Textarea
                value={editedProfile.skills.join(', ')}
                onChange={handleSkillChange}
                rows={2}
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
            </div>
            
            <div className="space-y-3">
              <label className={`text-sm font-medium ${textClasses}`}>Links</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Github className={`h-4 w-4 mr-2 ${mutedTextClasses}`} />
                  <Input
                    name="github"
                    value={editedProfile.github}
                    onChange={handleChange}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
                <div className="flex items-center">
                  <Twitter className={`h-4 w-4 mr-2 ${mutedTextClasses}`} />
                  <Input
                    name="twitter"
                    value={editedProfile.twitter}
                    onChange={handleChange}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
                <div className="flex items-center">
                  <LinkIcon className={`h-4 w-4 mr-2 ${mutedTextClasses}`} />
                  <Input
                    name="website"
                    value={editedProfile.website}
                    onChange={handleChange}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}