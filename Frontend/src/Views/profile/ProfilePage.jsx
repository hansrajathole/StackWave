import { useState } from 'react';
import { Clock, Code, Award, BookOpen, Briefcase, Edit, Github, Twitter, Link as LinkIcon, Save, X, MessageSquare, ThumbsUp, User, Users, Heart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Avatar,AvatarImage,AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
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
      { title: "Problem Solver", description: "Solved 200+ community questions", icon: <Code /> },
      { title: "Knowledge Sharer", description: "50+ detailed answers with code examples", icon: <BookOpen /> },
      { title: "Community Builder", description: "Started 3 popular discussion threads", icon: <Users /> }
    ]
  });
  
  const [editedProfile, setEditedProfile] = useState({...profile});
  
  const handleEditToggle = () => {
    if (editing) {
      setProfile(editedProfile);
    }
    setEditing(!editing);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({...editedProfile, [name]: value});
  };
  
  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditedProfile({...editedProfile, skills});
  };
  
  const handleCancel = () => {
    setEditedProfile({...profile});
    setEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white flex justify-center items-center">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              {editing ? (
                <div className="space-y-3">
                  <Input 
                    name="name"
                    value={editedProfile.name} 
                    onChange={handleChange}
                    className="bg-white/20 text-white border-none placeholder-white/70"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      name="title"
                      value={editedProfile.title} 
                      onChange={handleChange}
                      className="bg-white/20 text-white border-none placeholder-white/70"
                    />
                    <Input 
                      name="location"
                      value={editedProfile.location} 
                      onChange={handleChange}
                      className="bg-white/20 text-white border-none placeholder-white/70"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-white/90">
                    <span>{profile.title}</span>
                    <span>•</span>
                    <span>{profile.location}</span>
                  </div>
                </>
              )}
              
              <div className="mt-4 flex flex-wrap gap-3">
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  <Award className="h-3 w-3 mr-1" />
                  Reputation: 5,842
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Solutions: 78
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Responses: 246
                </Badge>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              {editing ? (
                <div className="flex gap-2">
                  <Button onClick={handleCancel} size="sm" variant="secondary">
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button onClick={handleEditToggle} size="sm" variant="default">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              ) : (
                <Button onClick={handleEditToggle} size="sm" variant="secondary">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* About */}
            <Card className="p-5">
              <h3 className="font-medium text-lg mb-3">About</h3>
              {editing ? (
                <Textarea 
                  name="bio"
                  value={editedProfile.bio} 
                  onChange={handleChange}
                  className="min-h-24"
                />
              ) : (
                <p className="text-gray-600">{profile.bio}</p>
              )}
            </Card>
            
            {/* Skills */}
            <Card className="p-5">
              <h3 className="font-medium text-lg mb-3">Skills</h3>
              {editing ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Enter skills separated by commas</p>
                  <Textarea 
                    value={editedProfile.skills.join(', ')} 
                    onChange={handleSkillChange}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              )}
            </Card>
            
            {/* Links */}
            <Card className="p-5">
              <h3 className="font-medium text-lg mb-3">Links</h3>
              <div className="space-y-3">
                {editing ? (
                  <>
                    <div className="flex items-center">
                      <Github className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        name="github"
                        value={editedProfile.github} 
                        onChange={handleChange}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center">
                      <Twitter className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        name="twitter"
                        value={editedProfile.twitter} 
                        onChange={handleChange}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        name="website"
                        value={editedProfile.website} 
                        onChange={handleChange}
                        className="flex-1"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-gray-600">
                      <Github className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`https://${profile.github}`} className="hover:text-blue-600">{profile.github}</a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Twitter className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`https://${profile.twitter}`} className="hover:text-blue-600">{profile.twitter}</a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`https://${profile.website}`} className="hover:text-blue-600">{profile.website}</a>
                    </div>
                  </>
                )}
              </div>
            </Card>
            
            {/* Achievements */}
            <Card className="p-5">
              <h3 className="font-medium text-lg mb-3">Achievements</h3>
              <div className="space-y-4">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertTitle>Streak: 42 days!</AlertTitle>
              <AlertDescription>
                You're on a roll! Keep up the great contributions to maintain your streak.
              </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-medium text-lg mb-3">Activity Overview</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Solutions</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Questions</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Comments</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-5">
                  <h3 className="font-medium text-lg mb-3">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Commented on "How to optimize React rendering"</span>
                          </div>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 
                            {index === 0 ? "2h ago" : index === 1 ? "Yesterday" : "3d ago"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 pl-6">
                          "You might want to consider using React.memo or useMemo for expensive calculations..."
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">Load More</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="solutions" className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-medium text-lg mb-3">Top Solutions</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">How to implement authentication with JWT in React</h4>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" /> 
                            {42 - index * 12}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          "First, you need to set up your API endpoints to generate tokens..."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>react</Badge>
                          <Badge>authentication</Badge>
                          <Badge>jwt</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Solutions</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="questions" className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-medium text-lg mb-3">Your Questions</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Best practices for state management in large React applications</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" /> 
                              {8 - index * 2}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          "I'm working on a large-scale application and struggling with state management..."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>react</Badge>
                          <Badge>redux</Badge>
                          <Badge>state-management</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Questions</Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="badges" className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-medium text-lg mb-3">Earned Badges</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { name: "First Solution", icon: <Award />, level: "gold" },
                      { name: "Good Question", icon: <MessageSquare />, level: "silver" },
                      { name: "Team Player", icon: <Users />, level: "gold" },
                      { name: "Code Master", icon: <Code />, level: "bronze" },
                      { name: "Helping Hand", icon: <Heart />, level: "silver" },
                      { name: "Quick Responder", icon: <Clock />, level: "bronze" }
                    ].map((badge, index) => (
                      <div key={index} className="border rounded-lg p-3 flex flex-col items-center text-center">
                        <div className={`p-3 rounded-full mb-2 ${
                          badge.level === "gold" ? "bg-yellow-100 text-yellow-600" :
                          badge.level === "silver" ? "bg-gray-100 text-gray-600" :
                          "bg-orange-100 text-orange-600"
                        }`}>
                          {badge.icon}
                        </div>
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                        <p className="text-xs text-gray-500 capitalize">{badge.level}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}