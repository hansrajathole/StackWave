import { useEffect, useRef, useState } from "react";
import { Clock, Award, Edit, Link as LinkIcon, MessageSquare, ThumbsUp,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../Redux/AuthSlice";

export default function ProfilePage() {

  const { userId } = useParams();
  const imageRef = useRef();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const baseUrl =  import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);

        setEditedProfile({ ...res.data });
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error fetching user profile:", error);
        setError("Failed to load user profile");
        setLoading(false);
      });
  }, [userId]);

  const handleOpenEditDialog = () => {
    setEditedProfile({ ...user });
    setEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    axios
      .put(`${baseUrl}/api/users/${userId}`, editedProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.user);
        setUser(res.data.user);
        setEditDialogOpen(false);
      })
      .catch((error) => {
        // console.error("Error updating profile:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setEditedProfile({ ...editedProfile, skills });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    // console.log(file);
    
    const formData = new FormData();    
    formData.append("image", file);

    
    axios
      .put(`${baseUrl}/api/users/editprofileimg/${userId}`, formData, {  
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.user.avatar);
        setUser((prevUser) => ({
          ...prevUser,
          avatar: res.data.user.avatar,
        }));
        dispatch(setAuthUser(res.data.user));
    
      })
      .catch((error) => {
        // console.error("Error updating profile image:", error);
      });
  };
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            Error Loading Profile
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {error || "User not found"}
          </p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Calculate stats
  const questionsCount = user.questions?.length || 0;
  const answersCount = user.answers?.length || 0;
  const totalActivity = questionsCount + answersCount;

  // Calculate percentages for progress bars
  const questionsPercentage =
    totalActivity > 0 ? (questionsCount / totalActivity) * 100 : 0;
  const answersPercentage =
    totalActivity > 0 ? (answersCount / totalActivity) * 100 : 0;

  // Get initials for avatar fallback
  const getInitials = (username) => {
    return username?.substring(0, 2).toUpperCase() || "U";
  };

  // Format recent activity
  const formatRecentActivity = () => {
    const allActivity = [
      ...(user.questions || []).map((q) => ({
        type: "question",
        title: q.title,
        content: q.body?.substring(0, 60) + "...",
        createdAt: new Date(q.createdAt),
        tags: q.tags || [],
      })),
      ...(user.answers || []).map((a) => ({
        type: "answer",
        title: `Answer to "${a.question?.title || "a question"}"`,
        content: a.body?.substring(0, 60) + "...",
        createdAt: new Date(a.createdAt),
        tags: [],
      })),
    ];

    // Sort by date, newest first
    return allActivity.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  };

  const recentActivity = formatRecentActivity();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden border dark:border-gray-800">
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 py-6 dark:text-white relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <Avatar className="h-44 w-44 border-4 ml-4 border-white">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-white ">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
               { user._id === userData._id && (
                <div className="absolute bottom-0 right-7 ">
                <Input
                   accept="image/*"
                   name="image"
                   type="file"
                   onChange={ (e) => {handleImageChange(e)}}
                   className="hidden"
                   ref={imageRef}
                   
                 />
                 <button
                   type="button"
                   onClick={() => imageRef.current.click()}
                   className="text-center flex justify-center cursor-pointer text-4xl rounded-full bg-gray-400 m-auto"
                 >
                  <i className="ri-pencil-line text-2xl m-auto px-1" ></i>
                 </button>
                </div>
               )}
              </div>

              <div className="flex-1 text-center sm:text-left justify-center sm:justify-start">
                <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-1 text-sm text-white/90">
                  <span>{user.title}</span>
                  <span>•</span>
                  <span>{user.location}</span>
                </div>

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    {user.reputation} Rep
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {user.answers?.length || 0} Solutions
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {user.questions?.length || 0} Questions
                  </Badge>
                </div>
              </div>

              {user._id === userData._id && (
                <Button
                  onClick={handleOpenEditDialog}
                  size="sm"
                  variant="secondary"
                  className="absolute top-4 right-4 dark:bg-gray-900"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-gray-900">
            <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
              About
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user.about}</p>

            <div className="mt-4">
              <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {user.websites &&
                user.websites.length > 0 &&
                user.websites.map((site, index) => {
                  if (!site) return null;

                  let icon = <LinkIcon className="h-4 w-4 mr-2" />;
                  let domain = site;

                  if (site.includes("github.com")) {
                    icon = <Github className="h-4 w-4 mr-2" />;
                  } else if (site.includes("twitter.com")) {
                    icon = <Twitter className="h-4 w-4 mr-2" />;
                  }

                  return (
                    <a
                      key={index}
                      href={site.startsWith("http") ? site : `https://${site}`}
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {icon}
                      {domain}
                    </a>
                  );
                })}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
           

            {/* Achievements */}
            <Card className="p-5 bg-white dark:bg-gray-900 border dark:border-gray-800">
              <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
                Badges
              </h3>
              {user.badges && user.badges.length > 0 ? (
                <div className="space-y-4">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-2 rounded-lg mr-3">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {badge}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No badges earned yet
                </p>
              )}
            </Card>

            {/* Stats Card */}
            <Card className="p-5 bg-white dark:bg-gray-900 border dark:border-gray-800">
              <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
                Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Reputation
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {user.reputation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Questions
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {user.questions?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Answers
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {user.answers?.length || 0}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="mb-2 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="answers">Answers</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-4">
                <Card className="p-5 bg-white dark:bg-gray-900 border dark:border-gray-800">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
                    Activity Overview
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          Questions
                        </span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {questionsPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={questionsPercentage}
                        className="h-2 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          Answers
                        </span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {answersPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={answersPercentage}
                        className="h-2 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-white dark:bg-gray-900 border dark:border-gray-800">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
                    Recent Activity
                  </h3>
                  {recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {activity.type === "question" ? (
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                              ) : (
                                <ThumbsUp className="h-4 w-4 text-green-500" />
                              )}
                              <span className="font-medium text-gray-800 dark:text-gray-200">
                                {activity.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(
                                activity.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 pl-6">
                            {activity.content}
                          </p>

                          {activity.tags && activity.tags.length > 0 && (
                            <div className="flex items-center gap-2 mt-2 pl-6">
                              {activity.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex}>{tag}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No recent activity
                    </p>
                  )}

                  {recentActivity.length > 0 && (
                    <Button variant="outline" className="w-full mt-4">
                      Load More
                    </Button>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="answers" className="space-y-4">
                <Card className="p-5 bg-white dark:bg-gray-900 border dark:border-gray-800">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
                    Your Answers
                  </h3>

                  {user.answers && user.answers.length > 0 ? (
                    <div className="space-y-4">
                      {user.answers.slice(0, 5).map((answer, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                              {answer.question?.title || "Answer to a question"}
                            </h4>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              {answer.upvotes || 0}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {answer.body?.substring(0, 120)}...
                          </p>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {new Date(answer.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No answers yet
                    </p>
                  )}

                  {user.answers && user.answers.length > 5 && (
                    <Button variant="outline" className="w-full mt-4">
                      View All Answers
                    </Button>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-4">
                <Card className="p-5 bg-white dark:bg-gray-900 border dark:border-gray-800">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">
                    Your Questions
                  </h3>

                  {user.questions && user.questions.length > 0 ? (
                    <div className="space-y-4">
                      {user.questions.slice(0, 5).map((question, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                              {question.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <MessageSquare className="h-3 w-3" />
                              {question.answers?.length || 0}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {question.body?.substring(0, 120)}...
                          </p>

                          {question.tags && question.tags.length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              {question.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex}>{tag}</Badge>
                              ))}
                            </div>
                          )}

                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {new Date(question.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No questions yet
                    </p>
                  )}

                  {user.questions && user.questions.length > 5 && (
                    <Button variant="outline" className="w-full mt-4">
                      View All Questions
                    </Button>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-200">
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Username
              </label>
              <Input
                name="username"
                value={editedProfile.username || ""}
                onChange={handleChange}
                className="dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Title
                </label>
                <Input
                  name="title"
                  value={editedProfile.title || ""}
                  onChange={handleChange}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Location
                </label>
                <Input
                  name="location"
                  value={editedProfile.location || ""}
                  onChange={handleChange}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                About
              </label>
              <Textarea
                name="about"
                value={editedProfile.about || ""}
                onChange={handleChange}
                rows={3}
                className="dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Skills (comma separated)
              </label>
              <Textarea
                value={editedProfile.skills?.join(", ") || ""}
                onChange={handleSkillChange}
                rows={2}
                className="dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
