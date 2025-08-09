

import React, { useState, useRef, useEffect } from 'react';
import { User, Camera, Mail, MapPin, Globe, FileText, Save, X, Edit3, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { UserModel } from '../types/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();

    const [profile, setProfile] = useState<UserModel>({
        id: '',
        userName: '',
        email: '',
        bio: '',
        location: '',
        website: '',
        profilePicture: '',
        createdAt: '',
        updatedAt: ''
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [removeProfilePictureFlag, setRemoveProfilePictureFlag] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Populate profile data from context user
    useEffect(() => {
        if (user) {
            setProfile({
                id: user.id || '',
                userName: user.userName || '',
                email: user.email || '',
                bio: user.bio || '',
                location: user.location || '',
                website: user.website || '',
                profilePicture: user.profilePicture || '',
                createdAt: user.createdAt || '',
                updatedAt: user.updatedAt || ''
            });
            setPreviewUrl(user.profilePicture || '');
            setRemoveProfilePictureFlag(false);
        }
    }, [user]);

    // Handle input change for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Handle new profile picture selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, profilePicture: 'Please select a valid image (JPEG, PNG, GIF, WebP)' }));
            return;
        }

        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, profilePicture: 'File size must be less than 5MB' }));
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setRemoveProfilePictureFlag(false); // user is uploading a new picture, so no removal
        setErrors(prev => ({ ...prev, profilePicture: '' }));
    };

    // Remove current profile picture
    const removeProfilePicture = () => {
        setSelectedFile(null);
        setPreviewUrl('');
        setRemoveProfilePictureFlag(true); // send deletion flag to backend
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Validate form before submit
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!profile.userName.trim()) {
            newErrors.userName = 'Username is required';
        } else if (profile.userName.length < 3 || profile.userName.length > 50) {
            newErrors.userName = 'Username must be 3-50 characters';
        }

        if (!profile.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (profile.bio && profile.bio.length > 500) {
            newErrors.bio = 'Bio must be less than 500 characters';
        }

        if (profile.website && !/^https?:\/\/.+/.test(profile.website)) {
            newErrors.website = 'Please enter a valid URL (http:// or https://)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit updated profile
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append('userName', profile.userName);
            formData.append('email', profile.email);
            formData.append('bio', profile.bio || '');
            formData.append('location', profile.location || '');
            formData.append('website', profile.website || '');

            if (selectedFile || previewUrl) {
                formData.append('profilePicture', selectedFile || previewUrl);
            }
            if (removeProfilePictureFlag) {
                formData.append('removeProfilePicture', 'true');
            }

            const data = await updateProfile(formData);

            if (data.success && data.user) {
                setMessage({ type: 'success', text: data.message });
                setProfile(data.user);
                setSelectedFile(null);
                setPreviewUrl(data.user.profilePicture || '');
                setRemoveProfilePictureFlag(false);
                toast.success(data.message);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
            navigate('/profile');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Edit3 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
                    </div>
                    <p className="text-slate-600">Update your profile information and settings</p>
                </div>

                {/* Alert Message */}
                {message && (
                    <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${message.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 mt-0.5 text-emerald-600" />
                        ) : (
                            <AlertCircle className="w-5 h-5 mt-0.5 text-red-600" />
                        )}
                        <span className="font-medium">{message.text}</span>
                    </div>
                )}

                <div className="space-y-8">
                    {/* Profile Picture Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Photo</h3>
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-slate-400" />
                                    )}
                                </div>
                                {previewUrl && (
                                    <button
                                        type="button"
                                        onClick={removeProfilePicture}
                                        className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                    Upload Photo
                                </button>
                                <p className="text-sm text-slate-500 mt-2">
                                    JPG, PNG, GIF or WebP. Max 5MB
                                </p>
                                {errors.profilePicture && (
                                    <p className="text-red-500 text-sm mt-2">{errors.profilePicture}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="userName"
                                        value={profile.userName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.userName ? 'border-red-300' : 'border-slate-300'}`}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                {errors.userName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.email ? 'border-red-300' : 'border-slate-300'}`}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none ${errors.bio ? 'border-red-300' : 'border-slate-300'}`}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                {errors.bio ? (
                                    <p className="text-red-500 text-sm">{errors.bio}</p>
                                ) : (
                                    <div />
                                )}
                                <span className="text-sm text-slate-500">
                                    {profile.bio?.length || 0}/500
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="Your location"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="url"
                                        name="website"
                                        value={profile.website}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.website ? 'border-red-300' : 'border-slate-300'}`}
                                        placeholder="https://your-website.com"
                                    />
                                </div>
                                {errors.website && (
                                    <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;












